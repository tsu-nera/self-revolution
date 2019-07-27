import React, { useState } from 'react';
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Text,
  Toast,
  Button
} from 'native-base';
import shortid from 'shortid';
import { withRouter } from 'react-router-native';
import { AuthSession } from 'expo';
import firebase from '~/lib/firebase';
import { getTwitterAccessToken, getTwitterRequestToken } from '~/lib/twitter';

import SubmitButton from './SubmitButton';

const AuthScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInSuccessWithAuthCallback = (
    credentials: firebase.auth.UserCredential
  ) => {
    const { user } = credentials;

    const isTwitter =
      credentials.additionalUserInfo &&
      credentials.additionalUserInfo.providerId === 'twitter.com';

    const data = {
      id: user!.uid,
      shortId: shortid.generate(),
      displayName: user!.displayName,
      photoURL: user!.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
      twitterUsername: isTwitter
        ? (credentials.additionalUserInfo! as any).username
        : ''
    };

    const secureId = shortid.generate();
    const dataSecure = {
      id: secureId,
      email: user!.email,
      accessTokenKey: isTwitter
        ? (credentials.credential! as any).accessToken
        : '',
      accessTokenSecret: isTwitter
        ? (credentials.credential! as any).secret
        : ''
    };

    const userRef = firebase
      .firestore()
      .collection('users')
      // uidにしないと、reduxのprofileとfirestoreのusersが同期しない。
      .doc(user!.uid);

    userRef.get().then(doc => {
      if (!doc.exists) {
        userRef.set(data);
        userRef
          .collection('securities')
          .doc(secureId)
          .set(dataSecure);
      }
    });

    return false;
  };

  const successToast = (path: string) =>
    Toast.show({
      text: 'ログインに成功しました！',
      duration: 3000,
      onClose: () => props.history.push(path)
    });

  const errorToast = (message: string) =>
    Toast.show({
      text: `ログインに失敗しました。(${message})`,
      duration: 3000
    });

  const signInWithEmail = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(credential => signInSuccessWithAuthCallback(credential))
      .then(() => successToast('/'))
      .catch(() =>
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(credential => signInSuccessWithAuthCallback(credential))
          .then(() => successToast('/settings'))
          .catch(error => errorToast(error.message))
      );
  };

  const signInWithTwitter = async () => {
    const res: any = await getTwitterRequestToken();
    const { oauth_token, oauth_token_secret } = res; //eslint-disable-line

    /* eslint-disable */
    if (!oauth_token || !oauth_token_secret) {
      errorToast(oauth_token);
      return;
    }
    /* eslint-enable */

    const authUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`; //eslint-disable-line

    /* eslint-disable */
    const oauth_verifier = await AuthSession.startAsync({ authUrl }).then(
      (res: any) => res.params.oauth_verifier
    );
    /* eslint-enable */

    const result: any = await getTwitterAccessToken({
      oauth_token, //eslint-disable-line
      oauth_token_secret, //eslint-disable-line
      oauth_verifier //eslint-disable-line
    });

    /* eslint-disable */
    if (
      result.status !== 200 ||
      !(result.data.oauth_token && result.data.oauth_token_secret)
    ) {
      console.log(result.deata.message);
      errorToast(result.data.message);
      return;
    }
    /* eslint-enable */

    const credential = firebase.auth.TwitterAuthProvider.credential(
      result.data.oauth_token, //eslint-disable-line
      result.data.oauth_token_secret //eslint-disable-line
    );

    /* eslint-disable */
    if (!credential) {
      errorToast(oauth_token);
      return;
    }
    /* eslint-enable */

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(credential => signInSuccessWithAuthCallback(credential))
      .then(() => successToast('/'))
      .catch(error => errorToast(error.message));
  };

  return (
    <Container>
      <Button full rounded info onPress={signInWithTwitter}>
        <Text>Twitterでログイン</Text>
      </Button>
      <Text />
      <Text style={{ textAlign: 'center' }}>または</Text>
      <Form>
        <Item floatingLabel>
          <Label>メールアドレス</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setEmail(text)}
          />
        </Item>
        <Item floatingLabel>
          <Label>パスワード</Label>
          <Input
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setPassword(text)}
          />
        </Item>
        <Text />
        <SubmitButton
          handler={() => signInWithEmail(email, password)}
          text="メールでログイン"
        />
      </Form>
    </Container>
  );
};

export default withRouter(AuthScreen);

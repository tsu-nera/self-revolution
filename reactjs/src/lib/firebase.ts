import * as firebase from 'firebase/app';
import { isLoaded } from 'react-redux-firebase';

import { configDev, configProd } from './config';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import axios from './axios';

if (firebase.apps.length === 0) {
  if (
    process.env.REACT_APP_ENV === 'development' ||
    process.env.NODE_ENV === 'development'
  ) {
    firebase.initializeApp(configDev);
  } else {
    firebase.initializeApp(configProd);
  }
}

export const remove = (resourceId: string) =>
  firebase
    .firestore()
    .doc(resourceId)
    .delete();

export const create = (resourceId: string, data: any) =>
  firebase
    .firestore()
    .doc(resourceId)
    .set(data);

export const update = (resourceId: string, data: any) =>
  firebase
    .firestore()
    .doc(resourceId)
    .set(data, { merge: true });

export const isExist = (resourceId: string) =>
  firebase
    .firestore()
    .doc(resourceId)
    .get()
    .then(docSnapshot => docSnapshot.exists);

// const getBlob = (url: string) => {
//   return axios
//     .get(url, {
//       responseType: 'arraybuffer'
//     })
//     .then(response => new Blob([response.data]));
// };

// export const uploadToStorage = (
//   photoURL: string,
//   userShortId: string,
//   resourceId: string
// ) => {
//   const url = photoURL.replace('_normal.', '.');

//   getBlob(url).then((binary: any) => {
//     const storageRef = firebase.storage().ref();
//     const avatarImagesRef = storageRef.child(`users/${userShortId}/avatar.png`);

//     return avatarImagesRef
//       .put(binary)
//       .then(() => avatarImagesRef.getDownloadURL())
//       .then(url =>
//         firebase
//           .firestore()
//           .doc(resourceId)
//           .update({ photoURL: url })
//       );
//   });
// };

export const uploadPhotoURLAsync = async (
  photoURL: string,
  userShortId: string,
  resourceId: string
) => {
  const uri = photoURL.replace('_normal.', '.');

  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // eslint-disable-line
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(`users/${userShortId}/avatar.png`);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  // only-mobile
  if (!window) blob.close(); // eslint-disable-line

  return snapshot.ref.getDownloadURL().then(url =>
    firebase
      .firestore()
      .doc(resourceId)
      .update({ photoURL: url })
  );
};

export const isReady = (target: any) => isLoaded(target) && target;

export const isLogin = (state: any) =>
  state.firebase.auth.isLoaded &&
  !state.firebase.auth.isEmpty &&
  state.firebase.profile !== null;

export const lazyEvalValue = (target: any) =>
  isLoaded(target) ? target : null;
export const lazyEvalValues = (items: any[]) => (isLoaded(items) ? items : []);

export const createCustomToken = (token: string, isApple: boolean) => {
  const data = {
    token
  };

  if (isApple) {
    axios.defaults.baseURL =
      'https://us-central1-titan-apple-demo2.cloudfunctions.net/api';
  }

  return axios
    .post('/firebase/create_token', data)
    .then(res => res.data)
    .catch(res => res.data);
};

export default firebase;

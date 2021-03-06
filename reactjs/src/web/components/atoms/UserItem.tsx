import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';

import styled from 'styled-components';
import UserAvatar from '~/web/components/atoms/UserAvatar';
import theme from '~/lib/theme';

const StyledButton = styled(Button)`
  && {
    margin: ${theme.spacing(0)}px;
    font-weight: bold;
  }
` as React.ComponentType<ButtonProps>;

const UserItem = (props: any) => {
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => (window.location.href = '/')); // eslint-disable-line
  };

  const { user } = props;

  return (
    <div>
      <StyledButton color="inherit">
        <UserAvatar photoURL={user.photoURL} userId={user.shortId} />
      </StyledButton>
      <StyledButton
        variant="outlined"
        size="small"
        color="inherit"
        onClick={signOut}
      >
        ログアウト
      </StyledButton>
    </div>
  );
};

export default UserItem;

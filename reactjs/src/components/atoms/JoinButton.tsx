import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../lib/firebase';

const joinHandler = (props: any) => {
  const { challengeId, userId } = props;

  const newData = {
    id: userId,
    histories: [],
    createdAt: new Date()
  };

  firebase
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .collection('participants')
    .doc(userId)
    .set(newData)
    .then(() => {
      window.alert('チャレンジに参加しました'); // eslint-disable-line
    })
    .then(() => (window.location.href = `/#/challenges/${challengeId}/posts`));// eslint-disable-line
};

const renderJoinButton = (props: any) => (
  <Button
    color="inherit"
    variant="outlined"
    size="small"
    onClick={() => joinHandler(props)}
  >
    参加する
  </Button>
);

const StyledLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
    margin-left: 10px;
  }
`;

const renderPostButton = (props: any) => (
  <StyledLink to={`/challenges/${props.id}/posts`}>
    <Button color="inherit" variant="outlined" size="small">
      投稿
    </Button>
  </StyledLink>
);

const JoinButton = (props: any) => {
  const { challengeId, userId } = props;
  const [join, setJoin] = useState(false);

  if (challengeId === undefined || userId === undefined) {
    console.log('loading...');
    return <div />;
  }

  firebase
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .collection('participants')
    .where('id', '==', userId)
    .get()
    .then((s: any) => setJoin(!s.empty));

  return join
    ? renderPostButton({ id: challengeId })
    : renderJoinButton({ userId, challengeId });
};

const mapStateToProps = (state: any, props: {}) => ({
  userId: state.firebase.profile.id,
  ...props
});

export default connect(mapStateToProps)(JoinButton);

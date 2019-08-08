import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { Elements, StripeProvider } from 'react-stripe-elements';

import CheckoutForm from '~/web/components/atoms/CheckoutForm';
import ChallengePostController from '~/web/components/molecules/challenges/ChallengePostController';
import theme, { secondaryColor, brandWhite } from '~/lib/theme';
import firebase from '~/lib/firebase';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const StyledModalContent = styled.div`
  && {
    position: absolute;
    width: 350px;
    background-color: ${theme.palette.background.paper};
    box-shadow: ${theme.shadows[5]}px;
    padding: ${theme.spacing(4)}px;
    outline: none;
  }
`;

const ChallengeButton = (props: any) => {
  const { challenge, user } = props;
  const challengeId = challenge.id;
  const { price, title } = challenge;
  const [join, setJoin] = useState(false);

  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const STRIPE_PUB_KEY =
    process.env.APP_ENV === 'development'
      ? (process.env.REACT_APP_STRIPE_TEST_PUB_KEY as string)
      : (process.env.REACT_APP_STRIPE_PROD_PUB_KEY as string);

  const renderCheckoutButton = (props: any) => (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          backgroundColor: secondaryColor,
          color: brandWhite,
          fontWeight: 'bold',
          marginLeft: 10
        }}
      >
        参加
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <StyledModalContent style={modalStyle}>
          <StripeProvider apiKey={STRIPE_PUB_KEY}>
            <Elements>
              <CheckoutForm
                user={user}
                challengeId={challengeId}
                price={price}
                challengeName={title}
              />
            </Elements>
          </StripeProvider>
        </StyledModalContent>
      </Modal>
    </React.Fragment>
  );

  if (challengeId === undefined || user.id === undefined) {
    return null;
  }

  firebase
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .collection('participants')
    .where('id', '==', user.shortId)
    .get()
    .then((s: any) => setJoin(!s.empty));

  return join ? (
    <ChallengePostController userShortId={user.shortId} challenge={challenge} />
  ) : (
    renderCheckoutButton({ user, challengeId, price })
  );
};

const mapStateToProps = (state: any, props: {}) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(ChallengeButton);

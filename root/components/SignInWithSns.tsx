import React from 'react';
import firebase, { auth, db, providerGoogle } from '../utils/firebase';
import styled from 'styled-components';
import Image from 'next/image';

export const SignInWithSns = () => {
  const googleLogin = async () => {
    try {
      const res = await auth.signInWithPopup(providerGoogle);
      console.log(res);
      snsLoginResponse(res);
    } catch (error) {
      console.error(error);
    }
  };

  const snsLoginResponse = async (res: firebase.auth.UserCredential) => {
    const user = res.user as firebase.User;
    try {
      return await db.collection('users').doc(user.uid).set({
        name: user.displayName,
        icon: user.photoURL,
        id: user?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <h3>SNSログイン</h3>
        <StyledImage
          src="/images/google.png"
          alt="Googleログイン"
          width="200px"
          height="50px"
          onClick={googleLogin}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

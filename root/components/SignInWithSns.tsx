import React from 'react';
import firebase, {
  auth,
  db,
  providerGoogle,
  providerTwitter,
} from '../utils/firebase';
import styled from 'styled-components';
import Image from 'next/image';
import { toastState } from '../../recoil/root';
import { useSetRecoilState } from 'recoil';

export const SignInWithSns = () => {
  const setToast = useSetRecoilState(toastState);

  const snsLogin = async (provider: firebase.auth.AuthProvider) => {
    try {
      const res = await auth.signInWithPopup(provider);
      const { displayName, photoURL, uid } = res.user as firebase.User;
      return await db.collection('users').doc(uid).set({
        name: displayName,
        icon: photoURL,
        id: uid,
      });
    } catch (error) {
      setToast(['ログインに失敗しました', 'error']);
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
          onClick={() => snsLogin(providerGoogle)}
        />
        <StyledImage
          src="/images/twitter.png"
          alt="Twitterログイン"
          width="150px"
          height="30px"
          onClick={() => snsLogin(providerTwitter)}
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
  // Imageが外側にdivを含むため
  > div {
    margin-bottom: 10px;
  }
`;

const StyledImage = styled(Image)`
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

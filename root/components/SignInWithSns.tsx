import React from 'react';
import { useRouter } from 'next/router';
import firebase, {
  auth,
  db,
  providerGoogle,
  providerTwitter,
  providerGithub,
} from '../utils/firebase';
import styled from 'styled-components';
import Image from 'next/image';
import { toastState } from '../../recoil/root';
import { useSetRecoilState } from 'recoil';

export const SignInWithSns = () => {
  const setToast = useSetRecoilState(toastState);
  const router = useRouter();

  const snsLogin = async (provider: firebase.auth.AuthProvider) => {
    try {
      const res = await auth.signInWithPopup(provider);
      const { displayName, photoURL, uid } = res.user as firebase.User;
      await db.collection('users').doc(uid).set({
        name: displayName,
        icon: photoURL,
        id: uid,
      });
      router.push('/');
    } catch (error) {
      setToast(['ログインに失敗しました', 'error']);
    }
  };

  return (
    <Container>
      <StyledImage
        src="/images/google.jpg"
        alt="Googleログイン"
        width="80px"
        height="80px"
        onClick={() => snsLogin(providerGoogle)}
      />
      <StyledImage
        src="/images/twitter.jpeg"
        alt="Twitterログイン"
        width="70px"
        height="70px"
        onClick={() => snsLogin(providerTwitter)}
      />
      <StyledImage
        src="/images/github.png"
        alt="Githubログイン"
        width="70px"
        height="70px"
        onClick={() => snsLogin(providerGithub)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  // Imageが外側にdivを含むため
  > div {
    margin-bottom: 10px;
  }
`;

const StyledImage = styled(Image)`
  cursor: pointer;
  border-radius: 500px;
  &:hover {
    opacity: 0.6;
  }
`;

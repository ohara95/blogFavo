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
      <StyledImage>
        <Image
          src="/images/google.jpg"
          alt="Googleログイン"
          width="30px"
          height="30px"
          onClick={() => snsLogin(providerGoogle)}
        />
        <span>SignIn With Google</span>
      </StyledImage>
      <StyledImage>
        <Image
          src="/images/twitter.jpeg"
          alt="Twitterログイン"
          width="30px"
          height="30px"
          onClick={() => snsLogin(providerTwitter)}
          css="border-radius:30px"
        />
        <span>SignIn With Twitter</span>
      </StyledImage>
      <StyledImage>
        <Image
          src="/images/github.png"
          alt="Githubログイン"
          width="30px"
          height="30px"
          onClick={() => snsLogin(providerGithub)}
        />
        <span>SignIn With Github</span>
      </StyledImage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  // Imageが外側にdivを含むため
  > div {
    margin-bottom: 10px;
  }
`;

const StyledImage = styled.div`
  border: 1px solid black;
  background-color:white;
  display: flex;
  align-items: center;
  width: 200px;
  border-radius: 5px;
  padding: 2px;
  &:hover {
    opacity: 0.6;
  };
  cursor: pointer;
  > span {
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
  }
}
`;

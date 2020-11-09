import React from 'react';
import Link from 'next/link';
import { TextField } from '@material-ui/core';
import {
  AuthenticateForm,
  AuthenticateContainer,
  StyledButton,
  Label,
  InputError,
} from '../styles/common';
import { useForm } from 'react-hook-form';
import { auth } from '../root/pages/utils/firebase';
import styled from 'styled-components';
import { sp } from '../styles/media';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, reset, errors } = useForm<FormData>();

  /** サインイン */
  const handleSignIn = async (data: FormData) => {
    try {
      const { email, password } = data;
      await auth.signInWithEmailAndPassword(email, password);
      reset();
    } catch (error) {
      console.log(error);
      alert('Failed to sign in.');
    }
  };

  return (
    <AuthenticateContainer>
      <h1>Sign in</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSignIn)}>
        <Label>
          メールアドレス
          <TextField
            fullWidth
            name="email"
            inputRef={register({
              required: 'メールアドレスを入力してください',
            })}
            error={'email' in errors}
          />
        </Label>
        {errors.email && <InputError>{errors.email.message}</InputError>}
        <Label>
          パスワード
          <TextField
            fullWidth
            name="password"
            type="password"
            inputRef={register({ required: 'パスワードを入力してください' })}
            error={'password' in errors}
          />
        </Label>
        {errors.password && <InputError>{errors.password.message}</InputError>}
        <StyledButton type="submit" fullWidth>
          Sign In
        </StyledButton>
        <AuthenticateLink>
          <Link href="/forgot">パスワードを忘れた</Link>
          <Link href="/signup">アカウントを持っていない方はこちら</Link>
        </AuthenticateLink>
      </AuthenticateForm>
    </AuthenticateContainer>
  );
}

const AuthenticateLink = styled.div`
  display: flex;
  justify-content: space-between;
  ${sp`
    flex-direction: column;
  `}
`;

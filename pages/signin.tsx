import React, { useState } from 'react';
import Link from 'next/link';
import { CircularProgress } from '@material-ui/core';
import {
  AuthenticateForm,
  AuthenticateContainer,
  StyledButton,
} from '../styles/common';
import { useForm } from 'react-hook-form';
import { auth } from '../root/pages/utils/firebase';
import styled from 'styled-components';
import { sp } from '../styles/media';
import { Toast } from '../root/components/Toast';
import { InputWithLabel } from '../root/components/InputWithLabel';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, reset, errors } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  /** サインイン */
  const handleSignIn = async (data: FormData) => {
    try {
      const { email, password } = data;
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      reset();
    } catch {
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const inputList = [
    {
      name: 'email',
      label: 'メールアドレス',
      error: 'email' in errors,
    },
    {
      name: 'password',
      label: 'パスワード',
      error: 'password' in errors,
    },
  ];

  return (
    <AuthenticateContainer>
      <h1>Sign in</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSignIn)}>
        {inputList.map(({ name, label, error }) => (
          <InputWithLabel
            label={label}
            register={register}
            error={error}
            name={name}
            key={name}
          />
        ))}
        <StyledButton
          type="submit"
          fullWidth
          disabled={loading}
          loading={loading ? true : undefined} // warningが出るため
        >
          {loading ? <CircularProgress size={14} /> : 'ログイン'}
        </StyledButton>
        <AuthenticateLink>
          <Link href="/forgot">パスワードを忘れた</Link>
          <Link href="/signup">アカウントを持っていない方はこちら</Link>
        </AuthenticateLink>
      </AuthenticateForm>

      {/* トースト */}
      <Toast
        vertical="top"
        horizontal="center"
        open={open}
        serverity="error"
        message="ログインに失敗しました"
        handleClose={handleClose}
      />
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

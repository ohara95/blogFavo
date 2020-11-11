import React, { useState } from 'react';
import Link from 'next/link';
import { CircularProgress } from '@material-ui/core';
import {
  AuthenticateForm,
  AuthenticateContainer,
  StyledButton,
} from '../styles/common';
import { useForm } from 'react-hook-form';
import { auth } from '../root/utils/firebase';
import styled from 'styled-components';
import { sp } from '../styles/media';
import { Toast } from '../root/components/Toast';
import { InputWithLabel } from '../root/components/InputWithLabel';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, reset, errors, formState } = useForm<
    FormData
  >();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  /** サインイン */
  const handleSignIn = async (data: FormData) => {
    try {
      const { email, password } = data;
      await auth.signInWithEmailAndPassword(email, password);
      reset();
    } catch {
      setOpen(true);
    }
  };

  const inputList = [
    {
      name: 'email',
      label: 'メールアドレス',
      error: 'email' in errors,
      type: 'email',
    },
    {
      name: 'password',
      label: 'パスワード',
      error: 'password' in errors,
      type: 'password',
    },
  ];

  return (
    <AuthenticateContainer>
      <h1>Sign in</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSignIn)}>
        {inputList.map(({ name, label, error, type }) => (
          <InputWithLabel
            label={label}
            register={register}
            error={error}
            name={name}
            key={name}
            type={type as 'text' | 'email' | 'password' | undefined}
          />
        ))}
        <StyledButton
          type="submit"
          fullWidth
          disabled={formState.isSubmitting}
          loading={formState.isSubmitting ? true : undefined} // warningが出るため
        >
          {formState.isSubmitting ? <CircularProgress size={14} /> : 'ログイン'}
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

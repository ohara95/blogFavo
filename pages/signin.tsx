import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { InputType } from '../types';
import { ADD_BLOG } from '../recoil/dialog';
import { AddButton } from '../root/components';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, reset, errors, formState } = useForm<
    FormData
  >();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  /** サインイン */
  const handleSignIn = async (data: FormData) => {
    try {
      const { email, password } = data;
      await auth.signInWithEmailAndPassword(email, password);
      reset();
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setErrorMessage('メールアドレスが間違っています');
        setOpen(true);
      } else if (err.code === 'auth/wrong-password') {
        setErrorMessage('パスワードが間違っています');
        setOpen(true);
      }
    }
  };

  const inputList: InputType[] = [
    {
      name: 'email',
      label: 'メールアドレス',
      error: errors.email,
      type: 'email',
      inputRef: register({
        required: 'メールアドレスを入力してください',
        pattern: {
          value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
          message: 'メールアドレスの形式が不正です',
        },
      }),
    },
    {
      name: 'password',
      label: 'パスワード',
      error: errors.password,
      type: 'password',
      inputRef: register({ required: 'パスワードを入力してください' }),
    },
  ];

  return (
    <AuthenticateContainer>
      <h1>Sign in</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSignIn)}>
        {inputList.map((props) => (
          <InputWithLabel key={props.name} {...props} />
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
          <Link href="/forget">パスワードを忘れた</Link>
          <Link href="/signup">アカウントを持っていない方はこちら</Link>
        </AuthenticateLink>
      </AuthenticateForm>

      {/* トースト */}
      <Toast
        vertical="top"
        horizontal="center"
        open={open}
        serverity="error"
        message={errorMessage}
        handleClose={handleClose}
      />
      <AddButton dialogKey={ADD_BLOG} />
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

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { auth } from '../root/utils/firebase';
import { Toast } from '../root/components/Toast';
import { InputWithLabel } from '../root/components/InputWithLabel';
import { CircularProgress, Typography } from '@material-ui/core';
import {
  AuthenticateForm,
  AuthenticateContainer,
  StyledButton,
} from '../styles/common';

const ForgetPassword = () => {
  const { register, handleSubmit, errors, formState } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleClose = () => setOpen(false);

  const handleSend = async (data: { email: string }) => {
    const { email } = data;
    try {
      await auth.sendPasswordResetEmail(email);
      router.push('/signin');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setOpen(true);
        setErrorMessage('メールアドレスをお確かめください');
      }
    }
  };

  const inputList = [
    {
      name: 'email',
      label: 'メールアドレス',
      error: 'email' in errors,
      type: 'email',
    },
  ];

  return (
    <AuthenticateContainer>
      <h1>パスワード再設定</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSend)}>
        <Typography variant="subtitle1">
          アカウントに関連付けられているメールアドレスを入力すると、パスワードをリセットするためのリンクが記載されたメールが送信されます。
        </Typography>
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
          loading={formState.isSubmitting ? true : undefined}
        >
          {formState.isSubmitting ? <CircularProgress size={14} /> : '送信'}
        </StyledButton>
        <Link href="/signin">戻る</Link>
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
    </AuthenticateContainer>
  );
};

export default ForgetPassword;

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

type FormData = {
  email: string;
};

const ForgetPassword = () => {
  const { register, handleSubmit, errors, formState, control } = useForm<
    FormData
  >();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleClose = () => setOpen(false);

  const handleSend = async ({ email }: FormData) => {
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

  return (
    <AuthenticateContainer>
      <h1>パスワード再設定</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSend)}>
        <Typography variant="subtitle1">
          アカウントに関連付けられているメールアドレスを入力すると、パスワードをリセットするためのリンクが記載されたメールが送信されます。
        </Typography>
        <InputWithLabel
          label="メールアドレス"
          inputRef={register({
            required: 'メールアドレスを入力してください',
            pattern: {
              value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: 'メールアドレスの形式が不正です',
            },
          })}
          error={errors.email}
          control={control}
          name="email"
          type="email"
        />
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

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { auth } from '../root/utils/firebase';
import { InputWithLabel } from '../root/components/InputWithLabel';
import { CircularProgress, Typography } from '@material-ui/core';
import {
  AuthenticateForm,
  AuthenticateContainer,
  StyledButton,
} from '../styles/common';
import { useSetRecoilState } from 'recoil';
import { toastValue } from '../recoil/root';

type FormData = {
  email: string;
};

const ForgetPassword = () => {
  const { register, handleSubmit, errors, formState } = useForm<FormData>();
  const setToast = useSetRecoilState(toastValue);
  const router = useRouter();

  const handleSend = async ({ email }: FormData) => {
    try {
      await auth.sendPasswordResetEmail(email);
      router.push('/signin');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setToast(['メールアドレスをお確かめください', 'error']);
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
    </AuthenticateContainer>
  );
};

export default ForgetPassword;

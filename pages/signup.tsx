import React, { useState } from 'react';
import Link from 'next/link';
import { CircularProgress } from '@material-ui/core';
import {
  AuthenticateContainer,
  AuthenticateForm,
  StyledButton,
  InputError,
} from '../styles/common';
import { useForm } from 'react-hook-form';
import { auth, db } from '../root/utils/firebase';
import firebase from 'firebase';
import { Toast } from '../root/components/Toast';
import { InputWithLabel } from '../root/components/InputWithLabel';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  const { register, handleSubmit, reset, errors, formState } = useForm<
    FormData
  >();
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  /** メールアドレスとパスワードでユーザーを作成、名前も設定 */
  const createUser = async (email: string, password: string, name: string) => {
    const createdUser = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = createdUser.user as firebase.User;
    await db.collection('users').add({
      name,
      icon: 'https://wired.jp/app/uploads/2018/01/GettyImages-522585140.jpg',
      id: user?.uid,
    });
    return user.updateProfile({
      displayName: name,
      photoURL:
        'https://wired.jp/app/uploads/2018/01/GettyImages-522585140.jpg',
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  /** Sign Up */
  const handleSignUp = async (data: FormData) => {
    try {
      const { name, email, password, passwordConfirm } = data;

      // パスワードの不一致の場合return
      if (password !== passwordConfirm) {
        setIsError(true);
        return;
      }
      setIsError(false);

      // ユーザー作成
      await createUser(email, password, name);
      reset();
    } catch {
      setOpen(true);
    }
  };

  const inputList = [
    {
      name: 'name',
      label: '名前',
      error: 'name' in errors,
      type: 'text',
    },
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
    {
      name: 'passwordConfirm',
      label: 'パスワード再確認',
      error: 'passwordConfirm' in errors,
      type: 'password',
    },
  ];

  return (
    <AuthenticateContainer>
      <h1>Sign up</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSignUp)}>
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
        {isError && <InputError>パスワードが一致しません</InputError>}
        <StyledButton
          type="submit"
          fullWidth
          disabled={formState.isSubmitting}
          loading={formState.isSubmitting ? true : undefined} // warningが出るため
        >
          {formState.isSubmitting ? <CircularProgress size={14} /> : '登録'}
        </StyledButton>
        <Link href="/signin">既にアカウントをお持ちの方はこちら</Link>
      </AuthenticateForm>

      {/* トースト */}
      <Toast
        vertical="top"
        horizontal="center"
        open={open}
        serverity="error"
        message="登録に失敗しました"
        handleClose={handleClose}
      />
    </AuthenticateContainer>
  );
}

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
import { InputType } from '../types';
import { SignInWithSns } from '../root/components/SignInWithSns';

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
  const [errorMessage, setErrorMessage] = useState('');

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
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setErrorMessage('メールアドレスの書式をお確かめください');
        setOpen(true);
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('パスワードが短すぎます');
        setOpen(true);
      }
    }
  };

  const inputList: InputType[] = [
    {
      name: 'name',
      label: '名前',
      error: errors.name,
      inputRef: register({ required: '名前を入力してください' }),
    },
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
    {
      name: 'passwordConfirm',
      label: 'パスワード再確認',
      error: errors.passwordConfirm,
      type: 'password',
      inputRef: register({ required: 'パスワード再確認を入力してください' }),
    },
  ];

  return (
    <AuthenticateContainer>
      <h1>Sign up</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSignUp)}>
        {inputList.map((props) => (
          <InputWithLabel key={props.name} {...props} />
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
        <SignInWithSns />
        <Link href="/signin">既にアカウントをお持ちの方はこちら</Link>
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
}

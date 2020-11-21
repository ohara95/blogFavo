import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthenticateContainer, InputError } from '../styles/common';
import { useForm } from 'react-hook-form';
import { auth, db } from '../root/utils/firebase';
import firebase from 'firebase';
import { InputWithLabel } from '../root/components/InputWithLabel';
import { InputType } from '../types';
import { SignInWithSns } from '../root/components/SignInWithSns';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../recoil/root';
import { LoadingButton } from '../root/components/LoadingButton';
import { EMAIL_VALIDATION, NORMAL_VALIDATION } from '../root/utils/validation';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    formState,
  } = useForm<FormData>();
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const setToast = useSetRecoilState(toastState);

  /** メールアドレスとパスワードでユーザーを作成、名前も設定 */
  const createUser = async (email: string, password: string, name: string) => {
    const createdUser = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = createdUser.user as firebase.User;
    await db.collection('users').doc(user?.uid).set({
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
      router.push('/');
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setToast(['メールアドレスの書式をお確かめください', 'error']);
      } else if (err.code === 'auth/weak-password') {
        setToast(['パスワードが短すぎます', 'error']);
      }
    }
  };

  const inputList: InputType[] = [
    {
      name: 'name',
      label: '名前',
      error: errors.name,
      inputRef: register(NORMAL_VALIDATION),
    },
    {
      name: 'email',
      label: 'メールアドレス',
      error: errors.email,
      type: 'email',
      inputRef: register(EMAIL_VALIDATION),
    },
    {
      name: 'password',
      label: 'パスワード',
      error: errors.password,
      type: 'password',
      inputRef: register(NORMAL_VALIDATION),
    },
    {
      name: 'passwordConfirm',
      label: 'パスワード再確認',
      error: errors.passwordConfirm,
      type: 'password',
      inputRef: register(NORMAL_VALIDATION),
    },
  ];

  return (
    <AuthenticateContainer>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(handleSignUp)}>
        {inputList.map((props) => (
          <InputWithLabel key={props.name} {...props} />
        ))}
        {isError && <InputError>パスワードが一致しません</InputError>}
        <LoadingButton
          fullWidth
          type="submit"
          disabled={formState.isSubmitting}
          loading={formState.isSubmitting}
        >
          登録
        </LoadingButton>
        <SignInWithSns />
        <Link href="/signin">既にアカウントをお持ちの方はこちら</Link>
      </form>
    </AuthenticateContainer>
  );
}

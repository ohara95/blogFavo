import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthenticateContainer, SPACE_BETWEEN } from '../styles/common';
import { useForm } from 'react-hook-form';
import { auth } from '../root/utils/firebase';
import { sp } from '../styles/media';
import { InputWithLabel } from '../root/components/InputWithLabel';
import { InputType } from '../types';
import { SignInWithSns } from '../root/components/SignInWithSns';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../recoil/root';
import { EMAIL_VALIDATION, NORMAL_VALIDATION } from '../root/utils/validation';
import { LoadingButton } from '../root/components/LoadingButton';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const setToast = useSetRecoilState(toastState);

  /** サインイン */
  const handleSignIn = async (data: FormData) => {
    try {
      const { email, password } = data;
      await auth.signInWithEmailAndPassword(email, password);
      reset();
      router.push('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setToast(['メールアドレスが間違っています', 'error']);
      } else if (err.code === 'auth/wrong-password') {
        setToast(['パスワードが間違っています', 'error']);
      }
    }
  };

  const inputList: InputType[] = [
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
  ];

  return (
    <AuthenticateContainer>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit(handleSignIn)}>
        {inputList.map((props) => (
          <InputWithLabel key={props.name} {...props} />
        ))}
        <LoadingButton
          type="submit"
          fullWidth
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          ログイン
        </LoadingButton>
        <SignInWithSns />
        <div
          css={`
            ${SPACE_BETWEEN}${sp`flex-direction: column`}
          `}
        >
          <Link href="/forget">パスワードを忘れた</Link>
          <Link href="/signup">アカウントを持っていない方はこちら</Link>
        </div>
      </form>
    </AuthenticateContainer>
  );
}

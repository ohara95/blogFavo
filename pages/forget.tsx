import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { auth } from '../root/utils/firebase';
import { InputWithLabel } from '../root/components/InputWithLabel';
import { AuthenticateContainer } from '../styles/common';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../recoil/root';
import { LoadingButton } from '../root/components/LoadingButton';
import { EMAIL_VALIDATION } from '../root/utils/validation';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

type FormData = {
  email: string;
};

export default function ForgetPassword() {
  const { register, handleSubmit, errors, formState } = useForm<FormData>();
  const setToast = useSetRecoilState(toastState);
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
      <form onSubmit={handleSubmit(handleSend)}>
        <p css="font-size: 16px; line-height: 1.75">
          登録されたアドレスを入力してください。
          <br />
          パスワードをリセットする為のリンクが記載されたメールが送信されます。
        </p>
        <InputWithLabel
          label="メールアドレス"
          inputRef={register(EMAIL_VALIDATION)}
          error={errors.email}
          name="email"
          type="email"
        />
        <LoadingButton
          disabled={formState.isSubmitting}
          loading={formState.isSubmitting}
          fullWidth
          type="submit"
        >
          送信
        </LoadingButton>
        <Link href="/signin">
          <ArrowBackIcon css="cursor: pointer" />
        </Link>
      </form>
    </AuthenticateContainer>
  );
}

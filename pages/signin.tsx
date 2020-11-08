import React from 'react';
import Link from 'next/link';
import { TextField } from '@material-ui/core';
import {
  AuthenticateForm,
  AuthenticateContainer,
  StyledButton,
  SpaceBetween,
  Label,
  InputError,
} from '../styles/common';
import { useForm } from 'react-hook-form';
import { auth } from '../root/pages/utils/firebase';

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { register, handleSubmit, reset, errors } = useForm<FormData>();

  /** サインイン */
  const handleSignIn = async(data: FormData) => {
    try {
      const { email, password } = data;
      await auth.signInWithEmailAndPassword(email, password);
      reset();
    } catch (error) {
      console.log(error);
      alert('Failed to sign in.');
    }
  };

  return (
    <AuthenticateContainer>
      <h1>Sign in</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSignIn)}>
        <Label>
          Email
          <TextField
            fullWidth
            name="email"
            inputRef={register({ required: 'Please enter.' })}
            error={'email' in errors}
          />
        </Label>
        {errors.email && <InputError>{errors.email.message}</InputError>}
        <Label>
          Password
          <TextField
            fullWidth
            name="password"
            type="password"
            inputRef={register({ required: 'Please enter.' })}
            error={'password' in errors}
          />
        </Label>
        {errors.password && <InputError>{errors.password.message}</InputError>}
        <StyledButton type="submit" fullWidth>
          Sign In
        </StyledButton>
        <SpaceBetween>
          <Link href="/forgot">Forgot password?</Link>
          <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
        </SpaceBetween>
      </AuthenticateForm>
    </AuthenticateContainer>
  );
};

export default SignIn;

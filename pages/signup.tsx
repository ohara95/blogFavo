import React, { useState } from 'react';
import Link from 'next/link';
import { TextField } from '@material-ui/core';
import {
  AuthenticateContainer,
  AuthenticateForm,
  Label,
  StyledButton,
  InputError,
} from '../styles/common';
import { useForm } from 'react-hook-form';
import { auth } from '../root/pages/utils/firebase';
import firebase from 'firebase';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUp = () => {
  const { register, handleSubmit, reset, errors } = useForm<FormData>();
  const [isError, setIsError] = useState(false);

  const createUser = (user: firebase.User, name: string) => {
    return user.updateProfile({
      displayName: name,
      photoURL:
        'https://wired.jp/app/uploads/2018/01/GettyImages-522585140.jpg',
    });
  };

  /** パスワードが一致しない場合エラーを出す */
  const passwordCheck = (password: string, password_confirm: string) => {
    if (password !== password_confirm) {
      setIsError(true);
    } else {
      setIsError(false);
      return false;
    }
  };

  const handleSignUp = async (data: FormData) => {
    try {
      const { name, email, password, passwordConfirm } = data;
      if(!passwordCheck(password, passwordConfirm)){
        return;
      }
      const createdUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = createdUser.user as firebase.User;
      await createUser(user, name);
      reset();
    } catch (error) {
      console.log(error);
      alert('Failed to sign up.');
    }
  };

  return (
    <AuthenticateContainer>
      <h1>Sign up</h1>
      <AuthenticateForm onSubmit={handleSubmit(handleSignUp)}>
        <Label>
          Name
          <TextField
            fullWidth
            name="name"
            inputRef={register({ required: 'Please enter.' })}
            error={'name' in errors}
          />
          {errors.name && <InputError>{errors.name.message}</InputError>}
        </Label>
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
        <Label>
          Password Confirm
          <TextField
            fullWidth
            name="passwordConfirm"
            type="password"
            inputRef={register({ required: 'Please enter.' })}
            error={'passwordConfirm' in errors}
          />
        </Label>
        {errors.passwordConfirm && (
          <InputError>{errors.passwordConfirm.message}</InputError>
        )}
        {isError && <InputError>Password doesn't match.</InputError>}
        <StyledButton type="submit" fullWidth>
          Sign Up
        </StyledButton>
        <Link href="/signin">Already have an account? Sign in</Link>
      </AuthenticateForm>
    </AuthenticateContainer>
  );
};

export default SignUp;

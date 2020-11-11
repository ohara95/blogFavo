import { TextField } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';
import { InputError } from '../../styles/common';

type Props = {
  label: string;
  name: string;
  register: any;
  error: boolean;
  type?: 'text' | 'email' | 'password';
};

export const InputWithLabel: FC<Props> = ({
  label,
  name,
  register,
  error,
  type = 'text',
}) => {
  return (
    <Label>
      {label}
      <TextField
        fullWidth
        type={type}
        name={name}
        inputRef={register({
          required: true,
        })}
        error={error}
      />
      {error && <InputError>{`${label}を入力してください`}</InputError>}
    </Label>
  );
};

const Label = styled.label`
  margin-top: 20px;
  display: block;
`;

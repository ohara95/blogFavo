import { TextField } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';
import { InputError } from '../../styles/common';
import { InputType } from '../../types';

type Props = InputType;

export const InputWithLabel: FC<Props> = ({ label, error, ...otherProps }) => {
  return (
    <Label>
      {label}
      <TextField {...otherProps} fullWidth error={error} />
      {error && <InputError>{error.message}</InputError>}
    </Label>
  );
};

const Label = styled.label`
  margin-top: 20px;
  display: block;
`;

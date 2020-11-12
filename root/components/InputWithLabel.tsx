import { TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { InputError, Label, LabelText } from '../../styles/common';
import { InputType } from '../../types';

type Props = InputType;

export const InputWithLabel: FC<Props> = ({ label, error, ...otherProps }) => {
  return (
    <Label>
      <LabelText>{label}</LabelText>
      <TextField {...otherProps} fullWidth error={error} />
      {error && <InputError>{error.message}</InputError>}
    </Label>
  );
};

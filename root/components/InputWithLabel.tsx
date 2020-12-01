import React, { FC } from 'react';
import {
  InputError,
  Label,
  LabelText,
  BaseTextField,
} from '../../styles/common';
import { InputType } from '../../types';

type Props = InputType;

export const InputWithLabel: FC<Props> = ({ label, error, ...otherProps }) => {
  return (
    <Label>
      <LabelText>{label}</LabelText>
      <BaseTextField {...otherProps} fullWidth error={error} />
      {error && <InputError>{error.message}</InputError>}
    </Label>
  );
};

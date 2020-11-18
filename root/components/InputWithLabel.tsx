import React, { FC } from 'react';
import {
  InputError,
  Label,
  LabelText,
  BaseTextField,
} from '../../styles/common';
import { InputType } from '../../types';
// import { InputAdornment } from '@material-ui/core';
import { Controller } from 'react-hook-form';

type Props = InputType;

export const InputWithLabel: FC<Props> = ({
  label,
  error,
  control,
  name,
  ...otherProps
}) => {
  return (
    <Label>
      <LabelText>{label}</LabelText>
      <Controller
        control={control}
        name={name}
        as={<BaseTextField {...otherProps} fullWidth error={error} />}
      />
      {error && <InputError>{error.message}</InputError>}
    </Label>
  );
};

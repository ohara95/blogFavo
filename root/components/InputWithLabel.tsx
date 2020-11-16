import React, { FC } from 'react';
import {
  InputError,
  Label,
  LabelText,
  BaseTextField,
} from '../../styles/common';
import { InputType } from '../../types';
import { InputAdornment } from '@material-ui/core';
import { Controller } from 'react-hook-form';

type Props = InputType;

export const InputWithLabel: FC<Props> = ({
  label,
  error,
  control,
  defaultValue,
  ...otherProps
}) => {
  return (
    <Label>
      <LabelText>{label}</LabelText>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        as={
          <BaseTextField
            {...otherProps}
            fullWidth
            error={error}
            InputProps={{ startAdornment: <InputAdornment position="start" /> }}
          />
        }
      />
      {error && <InputError>{error.message}</InputError>}
    </Label>
  );
};

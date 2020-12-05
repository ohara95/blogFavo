import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOR } from '../../styles/color';
import { Button, CircularProgress } from '@material-ui/core';

type Props = {
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'submit';
};

export const LoadingButton: FC<Props> = ({
  children,
  loading,
  ...otherProps
}) => {
  return (
    <StyledButton loading={loading} {...otherProps}>
      {loading ? <CircularProgress size={14} /> : children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)<Props>`
  margin: 24px 0 16px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.MAIN};
  box-shadow: ${COLOR.BLACK} 0px 1px 3px;
  height: 36px;
  &:hover {
    background-color: ${COLOR.LIGHT_GRAY};
    box-shadow: none;
  }
  ${({ loading }) =>
    loading && { backgroundColor: COLOR.LIGHT_GRAY, cursor: 'not-allowed' }}
`;

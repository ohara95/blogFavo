import React, { FC } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import styled from 'styled-components';

type Props = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  message: string;
  open: boolean;
  serverity: 'error' | 'warning' | 'info' | 'success';
  handleClose: () => void;
};

export const Toast: FC<Props> = ({
  vertical,
  horizontal,
  open,
  message,
  serverity,
  handleClose,
}) => {
  return (
    <StyledSnackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      key={vertical + horizontal}
      onClose={handleClose}
    >
      <Alert severity={serverity}>{message}</Alert>
    </StyledSnackbar>
  );
};

const StyledSnackbar = styled(Snackbar)`
  min-width: 250px;
`;

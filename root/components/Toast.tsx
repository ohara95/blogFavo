import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toastValue } from '../../recoil/root';

export const Toast = () => {
  const [text, severity] = useRecoilValue(toastValue);
  const reset = useResetRecoilState(toastValue);

  useEffect(() => {
    if (!text) return;

    /** 3秒後に閉じる */
    setTimeout(() => {
      reset();
    }, 3000);
  }, [text]);

  return (
    <>
      {text && (
        <StyledSnackbar
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={severity}>{text}</Alert>
        </StyledSnackbar>
      )}
    </>
  );
};

const StyledSnackbar = styled(Snackbar)`
  min-width: 250px;
`;

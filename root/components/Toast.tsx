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
    const closeTime = setTimeout(() => {
      reset();
    }, 3000);
    // clean up
    return () => {
      clearTimeout(closeTime);
    };
  }, [text]);

  return (
    <>
      {text && (
        <StyledSnackbar
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={reset}
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

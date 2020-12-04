import React, { useEffect } from 'react';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { toastState } from '../../recoil/root';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const Toast = () => {
  const [text, severity] = useRecoilValue(toastState);
  const reset = useResetRecoilState(toastState);

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
        <Snackbar
          css="min-width: 250px"
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={reset}
        >
          <Alert severity={severity}>{text}</Alert>
        </Snackbar>
      )}
    </>
  );
};

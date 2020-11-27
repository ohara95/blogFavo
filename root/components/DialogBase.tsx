import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { dialogData } from '../../recoil/dialog';
import { sp } from '../../styles/media';
//material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  title: string;
  handleSubmit?: any;
  dialogKey: string;
  handleClose?: any;
};

export const DialogBase: FC<Props> = ({
  children,
  title,
  handleSubmit,
  dialogKey,
}) => {
  const setDialog = useSetRecoilState(dialogData);
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    if (path === '/signup' || path === '/signin') {
      handleClose();
    }
  }, [path]);

  const handleClose = () => {
    setDialog((prev) => ({
      ...prev,
      [dialogKey]: false,
    }));
  };
  return (
    <StyledDialog open={true} onClose={handleClose}>
      <Form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <StyledCloseIcon onClick={handleClose} />
        </DialogHeader>
        <StyledDialogContent>{children}</StyledDialogContent>
        {handleSubmit && (
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button type="submit" color="primary" autoFocus>
              追加
            </Button>
          </DialogActions>
        )}
      </Form>
    </StyledDialog>
  );
};

export const StyledDialog = styled(Dialog)`
  ${sp`
    width: 100vw;
    .MuiDialog-paper {
        margin: 0;
        overflow: hidden;
    }
    .MuiDialog-paperScrollPaper {
        max-height: 100vh;
    }
  `}
`;

export const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
`;

export const StyledDialogContent = styled(DialogContent)`
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  ${sp`
    width: 100%;
  `}
`;

const Form = styled.form`
  ${sp`
    width: 100vw;
    height: 100%;
  `}
`;

const StyledCloseIcon = styled(CloseIcon)`
  display: none;
  ${sp`
        display: block;
        margin-right: 15px;
    `}
`;

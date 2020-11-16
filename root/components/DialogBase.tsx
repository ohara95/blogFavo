import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { dialogData } from '../../recoil/dialog';
import { sp } from '../../styles/media';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  title: string;
  handleSubmit: any;
  dialogKey: string;
  noActions?: boolean;
  doneText?: string;
};

export const DialogBase: FC<Props> = ({
  children,
  title,
  handleSubmit,
  dialogKey,
  noActions,
  doneText,
}) => {
  const setDialog = useSetRecoilState(dialogData);
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
        {!noActions && (
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button type="submit" color="primary" autoFocus>
              {doneText || '追加'}
            </Button>
          </DialogActions>
        )}
      </Form>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
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

const Form = styled.form`
  ${sp`
    width: 100vw;
    height: 100%;
  `}
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
`;

const StyledCloseIcon = styled(CloseIcon)`
  display: none;
  ${sp`
        display: block;
        margin-right: 15px;
    `}
`;

const StyledDialogContent = styled(DialogContent)`
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  ${sp`
    width: 100%;
  `}
`;

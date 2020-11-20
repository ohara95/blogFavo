import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { deleteConfig } from '../../recoil/configDialog';
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
  title?: string;
  handleSubmit?: any;
  text: string;
  doneText: string;
};

export const ConfirmDialog: FC<Props> = ({
  title = '確認',
  text,
  doneText,
}) => {
  const setDialog = useSetRecoilState(deleteConfig);
  const handleClose = () => {
    setDialog({
      isDisplay: false,
      id: '',
      isDone: false,
      type: '',
    });
  };
  return (
    <StyledDialog open={true} onClose={handleClose}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <StyledCloseIcon onClick={handleClose} />
      </DialogHeader>
      <StyledDialogContent>{text}</StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <Button
          type="submit"
          color="primary"
          autoFocus
          onClick={() => {
            setDialog((prev) => ({
              ...prev,
              isDone: true,
              isDisplay: false,
            }));
          }}
        >
          {doneText}
        </Button>
      </DialogActions>
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

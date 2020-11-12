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

type Props = {
  title: string;
  handleSubmit: any;
  dialogKey: string;
  hasActions?: boolean;
};

export const DialogBase: FC<Props> = ({
  children,
  title,
  handleSubmit,
  dialogKey,
  hasActions,
}) => {
  const setDialog = useSetRecoilState(dialogData);
  const handleClose = () => {
    setDialog((prev) => ({
      ...prev,
      [dialogKey]: false,
    }));
  };
  return (
    <Dialog open={true} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <StyledDialogContent>{children}</StyledDialogContent>
        {hasActions && (
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button type="submit" color="primary" autoFocus>
              追加
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};

const StyledDialogContent = styled(DialogContent)`
  width: 500px;
`;

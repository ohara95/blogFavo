import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { openDialog } from '../../recoil/dialog';

type Props = {
  title: string;
};

export const DialogBase: FC<Props> = ({ children, title }) => {
  const close = useSetRecoilState(openDialog);

  return (
    <Dialog open={true} onClose={() => close('')}>
      <DialogTitle>{title}</DialogTitle>
      <StyledDialogContent>{children}</StyledDialogContent>
    </Dialog>
  );
};

const StyledDialogContent = styled(DialogContent)`
  width: 500px;
`;

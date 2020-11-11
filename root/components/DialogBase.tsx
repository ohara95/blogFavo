import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { FC } from 'react';

type Props = {
  title: string;
};

export const DialogBase: FC<Props> = ({ children, title }) => {
  return (
    <Dialog open={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

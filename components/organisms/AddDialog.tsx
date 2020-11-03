import React, { FC } from 'react';
//material
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  onClickClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: boolean;
  title: string;
  render: FC<{ register: any; errors: any; control?: any }>;
  handleSubmit?: any;
  register: any;
  errors: any;
  control?: any;
  onSubmit?: any;
};

const AddDialog: FC<Props> = ({
  title,
  open,
  onClickClose,
  render: Render,
  handleSubmit,
  register,
  errors,
  control,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClickClose}>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {control ? (
            <Render {...{ register, errors, control }} />
          ) : (
            <Render {...{ register, errors }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={onSubmit} type="submit" color="primary" autoFocus>
            追加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDialog;

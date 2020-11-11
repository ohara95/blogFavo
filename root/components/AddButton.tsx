import React, { FC } from 'react';
import { DialogForm, AddDialog } from '../components';

// material
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    backgroundColor: cyan[700],
    color: 'white',
    '&:hover': {
      backgroundColor: cyan[500],
    },
  },
}));

type Props = {
  onClickOpen: () => void;
  open: boolean;
  onClickClose: () => void;
  title: string;
};

export const AddButton: FC<Props> = ({
  onClickOpen,
  open,
  onClickClose,
  title,
}) => {
  const classes = useStyles();

  return (
    <>
      <IconButton onClick={onClickOpen}>
        <Fab className={classes.absolute}>
          <AddIcon />
        </Fab>
      </IconButton>
      <AddDialog
        title={title}
        onClickClose={onClickClose}
        open={open}
        render={DialogForm}
      />
    </>
  );
};

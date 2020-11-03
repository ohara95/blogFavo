import React, { FC } from 'react';
import DialogForm from '../molecules/DialogForm';
import AddDialog from '../organisms/AddDialog';

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
  },
}));

type Props = {
  onClickOpen: () => void;
  open: boolean;
  onClickClose: () => void;
  title: string;
  handleSubmit: any;
  register: any;
  errors: any;
  control?: any;
};

const AddButton: FC<Props> = ({
  onClickOpen,
  open,
  onClickClose,
  title,
  handleSubmit,
  register,
  errors,
  control,
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
        register={register}
        errors={errors}
        control={control}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddButton;

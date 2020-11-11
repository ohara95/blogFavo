import React, { FC } from 'react';
// material
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import { dialogData } from '../../recoil/dialog';
import { useSetRecoilState } from 'recoil';

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
  dialogKey: string;
};

export const AddButton: FC<Props> = ({ dialogKey }) => {
  const classes = useStyles();
  const setDialog = useSetRecoilState(dialogData);

  const handleClickOpen = () => {
    setDialog((prev) => ({
      ...prev,
      [dialogKey]: true,
    }));
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Fab className={classes.absolute}>
          <AddIcon />
        </Fab>
      </IconButton>
    </>
  );
};

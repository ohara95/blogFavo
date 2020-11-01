import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    backgroundColor: cyan[700],
    color: 'white',
  },
}));

const AddButton = () => {
  const classes = useStyles();
  return (
    <Fab className={classes.absolute}>
      <AddIcon />
    </Fab>
  );
};

export default AddButton;

import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padding: {
      padding: theme.spacing(1),
    },
    error: {
      color: red[500],
    },
  })
);

type Props = {
  register: any;
  errors: any;
};

const SelectForm: FC<Props> = ({ register, errors }) => {
  const classes = useStyles();
  return (
    <form>
      {errors.addCategory && (
        <p className={classes.error}>{errors.addCategory.message}</p>
      )}
      <TextField
        className={classes.padding}
        name="addCategory"
        fullWidth
        inputRef={register({
          required: '入力してください',
        })}
      />
    </form>
  );
};

export default SelectForm;

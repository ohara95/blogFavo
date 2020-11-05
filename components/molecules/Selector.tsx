import React, { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { db } from '../../config/firebase';
import AddDialog from '../organisms/AddDialog';
import SelectForm from '../atoms/SelectForm';
import useFirebase from '../../hooks/useFirebase';

//material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    padding: {
      padding: theme.spacing(1),
    },
    selectInput: {
      padding: '15px!important',
    },
    error: {
      color: red[500],
    },
  })
);

type Props = {
  title: string;
  control: any;
};

type Category = {
  name: string; //DB適当
  id: string;
};

const Selector: FC<Props> = ({ title, control }) => {
  const classes = useStyles();
  const { register, errors } = useForm();
  const [open, setOpen] = useState(false);
  const [categoryList] = useFirebase<Category>('categoryList');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: { addCategory: string }) => {
    db.collection('categoryList')
      .add({
        name: data.addCategory,
      })
      .then(() => {
        handleClose();
      });
  };

  return (
    <>
      <InputLabel className={classes.margin}>
        {title}{' '}
        <IconButton size="small" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </InputLabel>
      <FormControl fullWidth className={classes.padding}>
        <Controller
          control={control}
          name="category"
          defaultValue="none"
          as={
            <Select
              classes={{ outlined: classes.selectInput }}
              variant="outlined"
            >
              <MenuItem value="none">選択してください</MenuItem>
              {categoryList &&
                categoryList.map((db) => {
                  return (
                    <MenuItem value={db.name} key={db.id}>
                      {db.name}
                    </MenuItem>
                  );
                })}
            </Select>
          }
        />
      </FormControl>
      <AddDialog
        onClickClose={handleClose}
        open={open}
        title="カテゴリー追加"
        render={SelectForm}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Selector;

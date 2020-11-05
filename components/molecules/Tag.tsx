import React, { useState, useEffect, FC } from 'react';
import { useForm } from 'react-hook-form';
import AddDialog from '../organisms/AddDialog';
import { db } from '../../config/firebase';
import TagForm from '../atoms/TagForm';
import { Tags } from '../../types';
//material
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    error: {
      color: red[500],
    },
  })
);

type Props = {
  formRegister: any;
};

const Tag: FC<Props> = ({ formRegister }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<Tags[]>([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: { addTag: string }) => {
    db.collection('tags')
      .add({
        name: data.addTag,
      })
      .then(() => {
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const clickButton = (id: string) => {
    setTags(
      tags.map((tag) =>
        id === tag.id ? { ...tag, isChecked: !tag.isChecked } : tag
      )
    );
  };

  useEffect(() => {
    db.collection('tags').onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          isChecked: false,
        };
      });
      setTags(data as Tags[]);
    });
  }, []);

  const selectTag = () => tags.filter((tag) => tag.isChecked === true);

  return (
    <>
      <InputLabel className={classes.margin}>
        Tag
        <IconButton size="small" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </InputLabel>
      {tags &&
        tags.map((tag) => {
          return (
            <Button
              variant={tag.isChecked ? 'contained' : 'outlined'}
              size="small"
              color="primary"
              className={classes.margin}
              onClick={() => clickButton(tag.id)}
              key={tag.id}
              ref={formRegister()}
              name="tag"
            >
              {tag.name}
            </Button>
          );
        })}
      <AddDialog
        title="Tag追加"
        open={open}
        onClickClose={handleClose}
        handleSubmit={handleSubmit(onSubmit)}
        render={TagForm}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default Tag;

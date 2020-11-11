import React, { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { CategorySelector, Tag } from '../components';

//material
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    padding: {
      padding: theme.spacing(1),
    },
    error: {
      color: red[500],
    },
    selectInput: {
      padding: '15px!important',
    },
  })
);

type Props = {
  register: any;
  errors: any;
  control?: any;
};

export const AddBlogForm: FC<Props> = ({ register, errors, control }) => {
  const classes = useStyles();
  const [isPublic, setIsPublic] = useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <InputLabel className={classes.margin}>Title*</InputLabel>
          {errors.title && (
            <p className={classes.error}>{errors.title.message}</p>
          )}
        </Grid>
        <TextField
          className={classes.padding}
          required
          name="title"
          fullWidth
          inputRef={register({
            required: '必須項目です',
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <InputLabel className={classes.margin}>URL*</InputLabel>
          {errors.url?.type === 'required' && (
            <p className={classes.error}>必須項目です</p>
          )}
          {errors.url?.type === 'pattern' && (
            <p className={classes.error}>正しい書式で入力してください</p>
          )}
        </Grid>
        <TextField
          className={classes.padding}
          required
          name="url"
          fullWidth
          inputRef={register({
            required: true,
            pattern: /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g,
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel className={classes.margin}>Memo</InputLabel>
        <TextField
          className={classes.padding}
          variant="outlined"
          fullWidth
          name="memo"
          multiline
          rows={5}
          inputRef={register}
        />
      </Grid>
      <Grid item xs={12}>
        <CategorySelector />
      </Grid>
      <Grid item xs={12}>
        <Tag />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <InputLabel className={classes.margin}>非公開</InputLabel>
          <Controller
            control={control}
            name="isPublic"
            className={classes.margin}
            as={
              <Checkbox
                checked={isPublic}
                onClick={(e) => {
                  setIsPublic((e.target as HTMLInputElement).checked);
                }}
                inputRef={register}
              />
            }
            color="primary"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

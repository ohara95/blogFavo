import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { imageData } from '../../recoil/root';
import { ImageUpload } from '../pages/utils/ImageUpload';
import { storage } from '../utils/firebase';

//material
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red, cyan } from '@material-ui/core/colors';

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
    input: {
      display: 'none',
    },
    themeColor: {
      backgroundColor: cyan[700],
      color: 'white',
      '&:hover': {
        backgroundColor: cyan[500],
      },
    },
    cancelColor: {
      backgroundColor: red[400],
      color: 'white',
      '&:hover': {
        backgroundColor: red[200],
      },
    },
  })
);

type Props = {
  register: any;
  errors: any;
};

export const AddCategoryForm: FC<Props> = ({ register, errors }) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useRecoilState(imageData);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      ImageUpload(file, setImageUrl);
    }
  };

  const deleteImage = () => {
    if (imageUrl) storage.refFromURL(imageUrl).delete();
    setImageUrl('');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <InputLabel className={classes.margin}>カテゴリー名*</InputLabel>
          {errors.category && (
            <p className={classes.error}>{errors.category.message}</p>
          )}
        </Grid>
        <TextField
          className={classes.padding}
          required
          name="category"
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
          <InputLabel className={classes.margin}>カテゴリー画像登録</InputLabel>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              className={classes.themeColor}
              component="span"
              style={{ marginLeft: 10 }}
            >
              Upload
            </Button>
          </label>
          <Button
            variant="contained"
            className={classes.cancelColor}
            component="span"
            style={{ marginLeft: 10 }}
            onClick={deleteImage}
          >
            取消
          </Button>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          {imageUrl && <img src={imageUrl} style={{ width: '50%' }} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

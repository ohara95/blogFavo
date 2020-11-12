import React, { useEffect } from 'react';
import { Category } from '../../types';
import { db } from '../utils/firebase';
import { useFirebase } from '../utils/hooks';
//material
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC } from 'react';

const filter = createFilterOptions<Category>();

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
  })
);

type Props = {
  category: Category | null;
  setCategory: (category: Category | null) => void;
};

export const CategorySelector: FC<Props> = ({ category, setCategory }) => {
  const [categoryList] = useFirebase<Category>('categoryList');
  const classes = useStyles();

  useEffect(() => {
    if (category) {
      if (categoryList.find((db) => db.name === category.name)) return;
      db.collection('categoryList').add({
        name: category.name,
      });
    }
  }, [category]);

  return (
    <>
      <InputLabel className={classes.margin}>カテゴリー</InputLabel>

      <Autocomplete
        value={category}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            setCategory({
              name: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // ユーザー入力から新しい値を作成
            setCategory({
              name: newValue.inputValue,
            });
          } else {
            setCategory(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `追加 "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={categoryList}
        getOptionLabel={(option) => {
          // 入力から直接入力で選択された値
          if (typeof option === 'string') {
            return option;
          }
          //値を追加
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={(option) => option.name}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            className={classes.padding}
            placeholder="選択してください"
          />
        )}
      />
    </>
  );
};

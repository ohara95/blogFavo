import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { addCategory } from '../../recoil/root';
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
import { Controller } from 'react-hook-form';

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

type Props = {};

export const CategorySelector: FC<Props> = ({}) => {
  const [value, setValue] = useState<Category | null>(null);
  const [categoryList] = useFirebase<Category>('categoryList');
  const setCategory = useSetRecoilState(addCategory);
  const classes = useStyles();

  useEffect(() => {
    if (value) {
      setCategory(value!.name);
      if (categoryList.find((db) => db.name === value.name)) return;
      db.collection('categoryList').add({
        name: value.name,
      });
    }
  }, [value]);

  return (
    <>
      <InputLabel className={classes.margin}>カテゴリー</InputLabel>

      <Autocomplete
        value={value}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              name: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // ユーザー入力から新しい値を作成
            setValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
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

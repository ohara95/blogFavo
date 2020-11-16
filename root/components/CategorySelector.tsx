import React, { useEffect, FC } from 'react';
import { Category } from '../../types';
import { db } from '../utils/firebase';
import { useFirebase } from '../utils/hooks';
import { Label, LabelText, BaseTextField } from '../../styles/common';
//material
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions<Category>();

type Props = {
  category: Category | null;
  setCategory: (category: Category | null) => void;
};

export const CategorySelector: FC<Props> = ({ category, setCategory }) => {
  const categoryList = useFirebase<Category>('categoryList');

  useEffect(() => {
    if (category) {
      if (categoryList.find((db) => db.name === category.name)) return;
      db.collection('categoryList').add({
        name: category.name,
      });
    }
  }, [category]);

  return (
    <Label>
      <LabelText>カテゴリー</LabelText>
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
          <BaseTextField
            {...params}
            variant="outlined"
            fullWidth
            placeholder="選択してください"
          />
        )}
      />
    </Label>
  );
};

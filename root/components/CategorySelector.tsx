import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useFirebase } from '../utils/hooks/useFirebase';
import { Category } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 20,
      minWidth: 120,
      width: '88%',
    },
  })
);

type Props = {
  publicCategory?: string;
  setPublicCategory: (param: string) => void;
};

export const CategorySelector: FC<Props> = ({
  publicCategory,
  setPublicCategory,
}) => {
  const categoryList = useFirebase<Category>('categoryList');
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl} fullWidth variant="outlined">
      <InputLabel htmlFor="age-native-simple">Category</InputLabel>
      <Select
        label="Category"
        native
        onChange={(e) => {
          setPublicCategory(e.target.value as string);
        }}
        value={publicCategory}
      >
        <option value="none">選択してください</option>
        {categoryList.map((category) => {
          return (
            <option key={category?.id} value={category?.name}>
              {category.name}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

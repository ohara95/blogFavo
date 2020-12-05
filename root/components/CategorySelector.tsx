import React, { FC } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useFirebase } from '../utils/hooks/useFirebase';
import { Category } from '../../types';
import styled from 'styled-components';

type Props = {
  publicCategory?: string;
  setPublicCategory: (param: string) => void;
};

export const CategorySelector: FC<Props> = ({
  publicCategory,
  setPublicCategory,
}) => {
  const categoryList = useFirebase<Category>('categoryList');
  return (
    <StyledFormControl fullWidth variant="outlined">
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
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)`
  margin: 20px;
  min-width: 120px;
  width: 88%;
`;

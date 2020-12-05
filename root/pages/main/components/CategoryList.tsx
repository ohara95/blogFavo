import React, { FC } from 'react';
import { Category, FormValues } from '../../../../types';
import { CategoryItem } from './CategoryItem';
// material
import { Grid } from '@material-ui/core';
import { ListContainer } from '../../../../styles/common';

type Props = {
  activePage: 'my' | 'user';
  blogData: FormValues[];
  data: Category[];
  setSelectCategory: (param: string) => void;
};

export const CategoryList: FC<Props> = ({
  activePage,
  blogData,
  data,
  setSelectCategory,
}) => (
  <ListContainer maxWidth="md">
    <Grid container spacing={4}>
      {data.map((card) => (
        <CategoryItem
          key={card.id}
          activePage={activePage}
          blogData={blogData}
          id={card.id}
          imageUrl={card.imageUrl}
          name={card.name}
          setSelectCategory={setSelectCategory}
        />
      ))}
    </Grid>
  </ListContainer>
);

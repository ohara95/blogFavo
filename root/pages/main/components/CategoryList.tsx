import React, { FC } from 'react';
import { Category, FormValues } from '../../../../types';
import { CategoryItem } from './CategoryItem';
// material
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

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
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
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
    </Container>
  );
};

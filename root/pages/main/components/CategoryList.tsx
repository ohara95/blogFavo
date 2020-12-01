import React, { FC } from 'react';
import { Category, FormValues } from '../../../../types';
import { CategoryItem } from './CategoryItem';
// material
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  defaultColor: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: cyan['A700'],
    width: '100%',
  },
}));

type Props = {
  activePage: 'my' | 'user';
  blogData: FormValues[];
  data: Category[];
};

export const CategoryList: FC<Props> = ({ activePage, blogData, data }) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((card) => (
          <CategoryItem
            activePage={activePage}
            blogData={blogData}
            id={card.id}
            imageUrl={card.imageUrl}
            name={card.name}
          />
        ))}
      </Grid>
    </Container>
  );
};

import React, { FC } from 'react';
import { Category, FormValues, MyCategory } from '../../../../types';
import { CategoryItem } from './CategoryItem';
// material
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  defaultColor: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: cyan['A700'],
    width: '100%',
  },
}));

type Props = {
  data: (Category | MyCategory)[];
  blogData: FormValues[];
  activePage: 'my' | 'user';
};

export const CategoryList: FC<Props> = ({ data, blogData, activePage }) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((card) => (
          <CategoryItem
            card={card}
            blogData={blogData}
            activePage={activePage}
          />
        ))}
      </Grid>
    </Container>
  );
};

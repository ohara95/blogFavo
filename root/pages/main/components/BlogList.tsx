import React, { FC } from 'react';
import { FormValues } from '../../../../types';
import { BlogItem } from './BlogItem';

// material
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

type BlogWithFavo = {
  favoUsers?: string[];
};

type Props = {
  data: (FormValues & BlogWithFavo)[] | undefined;
  activePage: 'my' | 'user';
  bookmarkToggle: (id: string | undefined) => void;
  deleteItem: (id: string | undefined, type: 'blog' | 'categoryList') => void;
  favoCount: (id: string) => void;
};
export const BlogList: FC<Props> = ({
  data,
  activePage,
  bookmarkToggle,
  deleteItem,
  favoCount,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data?.map((card) => (
          <BlogItem
            {...{ card, activePage, bookmarkToggle, deleteItem, favoCount }}
          />
        ))}
        ;
      </Grid>
    </Container>
  );
};

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

type Props = {
  blogData: FormValues[] | undefined;
  bookmarkToggle: (id: string) => void;
  favToggle: (id: string) => void;
  isDisplay: boolean;
};
export const BlogList: FC<Props> = ({
  blogData,
  bookmarkToggle,
  favToggle,
  isDisplay,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {blogData?.map((card) => (
          <BlogItem
            bookmarkToggle={bookmarkToggle}
            favCount={card.favCount}
            favToggle={favToggle}
            id={card.id}
            isDisplay={isDisplay}
            laterRead={card.laterRead}
            memo={card.memo}
            tag={card.tag}
            title={card.title}
          />
        ))}
      </Grid>
    </Container>
  );
};
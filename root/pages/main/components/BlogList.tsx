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
  bookmarkToggle: (id: string | undefined) => void;
  favoCount: (id: string) => void;
  isDisplay: boolean;
};
export const BlogList: FC<Props> = ({
  data,
  bookmarkToggle,
  favoCount,
  isDisplay,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data
          ?.filter((display) => !display?.isPrivate)
          .map((card) => (
            <BlogItem
              {...{
                card,
                bookmarkToggle,
                favoCount,
                isDisplay,
              }}
            />
          ))}
      </Grid>
    </Container>
  );
};

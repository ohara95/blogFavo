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
  data: FormValues[] | undefined;
  iconSwitch: (id: string, type: 'favUsers' | 'laterReadUsers') => void;
  isDisplay: boolean;
};
export const BlogList: FC<Props> = ({ data, iconSwitch, isDisplay }) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data?.map((card) => (
          <BlogItem
            favCount={card.favCount}
            iconSwitch={iconSwitch}
            id={card.id}
            isDisplay={isDisplay}
            memo={card.memo}
            tag={card.tag}
            title={card.title}
          />
        ))}
      </Grid>
    </Container>
  );
};

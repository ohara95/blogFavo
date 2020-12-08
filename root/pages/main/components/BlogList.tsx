import React, { FC } from 'react';
import { FormValues } from '../../../../types';
import { BlogItem } from './BlogItem';
// material
import { Grid } from '@material-ui/core';
import { ListContainer } from '../../../../styles/common';

type Props = {
  data: FormValues[] | undefined;
  iconSwitch: (id: string, type: 'favUsers' | 'laterReadUsers') => void;
  isDisplay: boolean;
};
export const BlogList: FC<Props> = ({ data, iconSwitch, isDisplay }) => (
  <ListContainer maxWidth="md">
    <Grid container spacing={4}>
      {data &&
        data?.map((card) => (
          <BlogItem
            key={card.id}
            favCount={card.favCount}
            iconSwitch={iconSwitch}
            id={card.id}
            isDisplay={isDisplay}
            isDone={card.isDone}
            memo={card.memo}
            tag={card.tag}
            title={card.title}
            url={card.url}
          />
        ))}
    </Grid>
  </ListContainer>
);

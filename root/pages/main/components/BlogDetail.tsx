import React, { FC } from 'react';
import Link from 'next/link';
import { FormValues } from '../../../../types';
import { auth } from '../../../utils/firebase';
import { useSetRecoilState } from 'recoil';
import { dialogData, RECOMMEND_REGISTER } from '../../../../recoil/dialog';
import styled from 'styled-components';
import { COLOR } from '../../../../styles/color';
// material
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import { DeleteButton } from '../../../components/DeleteButton';

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
  ButtonColor: {
    color: purple[200],
    border: `1px ${purple[200]} solid`,
  },
}));

type Props = {
  data: (FormValues | undefined)[];
  activePage: 'my' | 'user';
  handleIconClick: (
    id: string | undefined,
    type: 'isFavo' | 'laterRead'
  ) => void;
  isDisplay: boolean;
};

export const BlogDetail: FC<Props> = ({
  data,
  activePage,
  handleIconClick,
  isDisplay,
}) => {
  const classes = useStyles();
  const user = auth.currentUser;
  const setDialog = useSetRecoilState(dialogData);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data
          .filter((display) => !display?.isPrivate)
          .map((card) => {
            return (
              <Grid item key={card?.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card?.title && card.title}
                    </Typography>
                    <Typography>{card?.memo && card?.memo}</Typography>
                    <Typography>
                      {card?.tag &&
                        card?.tag.map((name) => (
                          <StyleTag key={card.id?.toString()}>{name}</StyleTag>
                        ))}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      blog
                    </Button>
                    {isDisplay && (
                      <>
                        <Link href={`/blogedit/${card?.id}`}>
                          <Button size="small" color="primary">
                            edit
                          </Button>
                        </Link>
                        <DeleteButton type="blog" id={card?.id} />
                      </>
                    )}
                    {!isDisplay && (
                      <>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            user
                              ? handleIconClick(card?.id, 'isFavo')
                              : setDialog((prev) => ({
                                  ...prev,
                                  [RECOMMEND_REGISTER]: true,
                                }));
                          }}
                        >
                          {card?.isFavo ? (
                            <StarRoundedIcon />
                          ) : (
                            <StarBorderRoundedIcon />
                          )}
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            user
                              ? handleIconClick(card?.id, 'laterRead')
                              : setDialog((prev) => ({
                                  ...prev,
                                  [RECOMMEND_REGISTER]: true,
                                }));
                          }}
                        >
                          {card?.laterRead ? (
                            <BookmarkRoundedIcon />
                          ) : (
                            <TurnedInNotRoundedIcon />
                          )}
                        </Button>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

const StyleTag = styled.div`
  position: relative;
  margin: 2px;
  display: inline-block;
  padding: 4px 12px;
  border: 1px solid ${COLOR.MAIN};
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 1px;
`;

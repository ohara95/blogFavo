import React, { FC } from 'react';
import Link from 'next/link';
import { FormValues } from '../../../../types';
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
import { auth } from '../../../utils/firebase';
import { useSetRecoilState } from 'recoil';
import { dialogData, RECOMMEND_REGISTER } from '../../../../recoil/dialog';

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
  deleteItem: (id: string | undefined, type: 'blog' | 'categoryList') => void;
};

export const BlogDetail: FC<Props> = ({
  data,
  activePage,
  handleIconClick,
  deleteItem,
}) => {
  const classes = useStyles();
  const user = auth.currentUser;
  const setDialog = useSetRecoilState(dialogData);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((card) => {
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
                        <Button
                          key={card?.id?.toString()}
                          disabled
                          variant="outlined"
                          size="small"
                          //何故かclassNameだと当たらないので直
                          style={{
                            color: purple[200],
                            border: `1px ${purple[200]} solid`,
                            marginTop: 10,
                            marginRight: 5,
                          }}
                        >
                          {name}
                        </Button>
                      ))}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    blog
                  </Button>
                  {activePage === 'my' && (
                    <>
                      <Link href={`/blogedit/${card?.id}`}>
                        <Button size="small" color="primary">
                          edit
                        </Button>
                      </Link>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => deleteItem(card?.id, 'blog')}
                      >
                        delete
                      </Button>
                    </>
                  )}
                  {activePage === 'user' && (
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

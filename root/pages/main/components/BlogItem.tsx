import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { FormValues } from '../../../../types';
import { auth, db } from '../../../utils/firebase';
import { useSetRecoilState } from 'recoil';
import { dialogData, RECOMMEND_REGISTER } from '../../../../recoil/dialog';
import styled from 'styled-components';
import { COLOR } from '../../../../styles/color';
import { DeleteButton } from '../../../components/DeleteButton';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
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
  bookmarkToggle: (id: string) => void;
  favCount: number;
  favToggle: (id: string) => void;
  id: string;
  isDisplay: boolean;
  laterRead: boolean;
  memo: string;
  tag: string[];
  title: string;
};

export const BlogItem: FC<Props> = ({
  bookmarkToggle,
  favToggle,
  favCount,
  id,
  isDisplay,
  laterRead,
  memo,
  tag,
  title,
}) => {
  const classes = useStyles();
  const user = auth.currentUser;
  const setDialog = useSetRecoilState(dialogData);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (user) {
      db.doc(`blog/${id}/favUsers/${user.uid}`).onSnapshot((doc) => {
        setIsFav(doc.exists);
      });
    }
  }, [user]);

  return (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="blogImage"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{memo}</Typography>
          <Typography>
            {tag.map((name) => (
              <StyleTag key={id.toString()}>{name}</StyleTag>
            ))}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            blog
          </Button>

          {isDisplay && (
            <>
              <Link href={`/blogedit/${id}`}>
                <Button size="small" color="primary">
                  edit
                </Button>
              </Link>
              <DeleteButton type="blog" id={id} />
            </>
          )}
          {!isDisplay && (
            <>
              <Button
                onClick={() => {
                  favToggle(id);
                  !user &&
                    setDialog((prev) => ({
                      ...prev,
                      [RECOMMEND_REGISTER]: true,
                    }));
                }}
                size="small"
                color="primary"
              >
                {isFav ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
                {favCount === 0 ? '' : favCount}
              </Button>

              <Button
                size="small"
                color="primary"
                onClick={() => {
                  user
                    ? bookmarkToggle(id)
                    : setDialog((prev) => ({
                        ...prev,
                        [RECOMMEND_REGISTER]: true,
                      }));
                }}
              >
                {laterRead ? (
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
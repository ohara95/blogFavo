import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { auth, db } from '../../../utils/firebase';
import { useSetRecoilState } from 'recoil';
import { dialogData, RECOMMEND_REGISTER } from '../../../../recoil/dialog';
import styled from 'styled-components';
import { DeleteButton } from '../../../components/DeleteButton';
//material
import {
  Button,
  CardActions,
  Typography,
  Checkbox,
  Tooltip,
} from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import {
  MoveCardGrid,
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
} from '../../../../styles/common';

type Props = {
  favCount: number;
  iconSwitch: (id: string, type: 'favUsers' | 'laterReadUsers') => void;
  id: string;
  isDisplay: boolean;
  isDone: boolean;
  memo: string;
  tag: string[];
  title: string;
};

export const BlogItem: FC<Props> = ({
  favCount,
  iconSwitch,
  id,
  isDisplay,
  isDone,
  memo,
  tag,
  title,
}) => {
  const user = auth.currentUser;
  const setDialog = useSetRecoilState(dialogData);
  const [isFav, setIsFav] = useState(false);
  const [isHoldLaterRead, setIsHoldLaterRead] = useState(false);

  useEffect(() => {
    if (user) {
      db.doc(`blog/${id}/favUsers/${user.uid}`).onSnapshot((doc) => {
        setIsFav(doc.exists);
      });
      db.doc(`blog/${id}/laterReadUsers/${user.uid}`).onSnapshot((doc) => {
        setIsHoldLaterRead(doc.exists);
      });
    }
  }, [user]);

  const isDoneUpdate = (id: string) => {
    db.collection('blog').doc(id).update({ isDone: !isDone });
  };

  return (
    <MoveCardGrid item key={id} xs={12} sm={6} md={4}>
      <StyledCard>
        <StyledCardMedia
          image="https://source.unsplash.com/random"
          title="blogImage"
        />
        <StyledCardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{memo}</Typography>
          <Typography>
            {tag.map((name) => (
              <StyleTag key={id.toString()}>{name}</StyleTag>
            ))}
          </Typography>
        </StyledCardContent>
        <CardActions>
          <Button size="small" color="primary">
            blog
          </Button>

          {isDisplay ? (
            <>
              <Link href={`/blogedit/${id}`}>
                <Button size="small" color="primary">
                  edit
                </Button>
              </Link>
              <Tooltip title={isDone ? 'read' : 'Not read'}>
                <Checkbox
                  size="small"
                  color="default"
                  checked={isDone}
                  onClick={() => {
                    isDoneUpdate(id);
                  }}
                />
              </Tooltip>
              <DeleteButton type="blog" id={id} />
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  iconSwitch(id, 'favUsers');
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
                {favCount !== 0 && favCount}
              </Button>

              <Button
                size="small"
                color="primary"
                onClick={() => {
                  user
                    ? iconSwitch(id, 'laterReadUsers')
                    : setDialog((prev) => ({
                        ...prev,
                        [RECOMMEND_REGISTER]: true,
                      }));
                }}
              >
                {isHoldLaterRead ? (
                  <BookmarkRoundedIcon />
                ) : (
                  <TurnedInNotRoundedIcon />
                )}
              </Button>
            </>
          )}
        </CardActions>
      </StyledCard>
    </MoveCardGrid>
  );
};

const StyleTag = styled.div`
  position: relative;
  margin: 2px;
  display: inline-block;
  padding: 4px 12px;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 8px;
  color: white;
  font-weight: 800;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #afeeee 10%, #40e0d0 30%, #20b2aa 80%);
  border-radius: 50px;
`;

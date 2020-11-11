import React, { FC } from 'react';
import { FormValues } from '../../../../types';
// material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { purple } from '@material-ui/core/colors';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

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
  data: FormValues[];
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

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.postedUser?.onSnapshot((snap) => snap.data())}
                  {card.title ? card.title : 'title'}
                </Typography>
                <Typography>{card.memo ? card.memo : 'memo'}</Typography>
                <Typography>
                  {card.tag.length ? (
                    <Button
                      disabled
                      variant="outlined"
                      size="small"
                      //何故かclassNameだと当たらないので直
                      style={{
                        color: purple[200],
                        border: `1px ${purple[200]} solid`,
                        marginTop: 10,
                      }}
                    >
                      {card.tag}
                    </Button>
                  ) : null}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  blog
                </Button>
                {activePage === 'my' && (
                  <>
                    <Button size="small" color="primary">
                      edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => deleteItem(card.id, 'blog')}
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
                        handleIconClick(card?.id, 'isFavo');
                      }}
                    >
                      {card.isFavo ? (
                        <StarRoundedIcon />
                      ) : (
                        <StarBorderRoundedIcon />
                      )}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        handleIconClick(card?.id, 'laterRead');
                      }}
                    >
                      {card.laterRead ? (
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
        ))}
      </Grid>
    </Container>
  );
};

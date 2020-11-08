import React, { FC, useState } from 'react';
import { Category } from '../../../../types';
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
}));

type Props = {
  data: Category[];
  number: number;
};

export const CategoryDetail: FC<Props> = ({ data, number }) => {
  const classes = useStyles();
  const [isClickStar, setIsClickStar] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

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
                  {card.name ? card.name : 'title'}({number})
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  blog
                </Button>
                <Button size="small" color="primary">
                  edit
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setIsClickStar(!isClickStar);
                  }}
                >
                  {isClickStar ? (
                    <StarRoundedIcon />
                  ) : (
                    <StarBorderRoundedIcon />
                  )}
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setIsBookmark(!isBookmark);
                  }}
                >
                  {isBookmark ? (
                    <BookmarkRoundedIcon />
                  ) : (
                    <TurnedInNotRoundedIcon />
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

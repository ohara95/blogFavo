import React, { FC } from 'react';
import { Category, FormValues } from '../../../../types';
import firebase from '../../../utils/firebase';
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
import { cyan } from '@material-ui/core/colors';

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
  defaultColor: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: cyan['A700'],
    width: '100%',
  },
}));

type Props = {
  data: Category[];
  blogData: FormValues[];
  deleteItem: (id: string | undefined, type: 'blog' | 'categoryList') => void;
  user: firebase.User | null;
};

export const CategoryDetail: FC<Props> = ({
  data,
  blogData,
  deleteItem,
  user,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              {card.imageUrl ? (
                <CardMedia
                  className={classes.cardMedia}
                  image={card.imageUrl}
                  title="Image title"
                />
              ) : (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.defaultColor}
                />
              )}
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h6">
                  {card.name ? card.name : 'title'}(
                  {blogData.filter((db) => db.category === card.name).length})
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  blog
                </Button>
                {user && (
                  <>
                    <Button size="small" color="primary">
                      edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        deleteItem(card.id, 'categoryList');
                      }}
                    >
                      delete
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

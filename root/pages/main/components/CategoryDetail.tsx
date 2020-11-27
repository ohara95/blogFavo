import React, { FC } from 'react';
import { Category, FormValues } from '../../../../types';
import Link from 'next/link';
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
import { cyan } from '@material-ui/core/colors';
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
  defaultColor: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: cyan['A700'],
    width: '100%',
  },
}));

type Props = {
  data: (Category | undefined)[];
  blogData: FormValues[];
  activePage: 'my' | 'user';
};

export const CategoryDetail: FC<Props> = ({ data, blogData, activePage }) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((card) => (
          <Grid item key={card?.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              {card?.imageUrl ? (
                <CardMedia
                  className={classes.cardMedia}
                  image={card?.imageUrl}
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
                  {card?.name ? card?.name : 'title'}(
                  {blogData.filter((db) => db.category === card?.name).length})
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  list
                </Button>
                {activePage === 'my' && (
                  <>
                    <Link href={`/categoryedit/${card?.id}`}>
                      <Button>edit</Button>
                    </Link>
                    <DeleteButton type="categoryList" id={card?.id} />
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

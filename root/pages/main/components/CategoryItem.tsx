import React, { FC } from 'react';
import { Category, FormValues, MyCategory } from '../../../../types';
import Link from 'next/link';
// material
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
  card: Category | MyCategory;
  blogData: FormValues[];
  activePage: 'my' | 'user';
};

export const CategoryItem: FC<Props> = ({ card, blogData, activePage }) => {
  const classes = useStyles();

  const categoryHoldBlog = blogData.filter(
    (blog) => blog.category === card.name
  );
  const myCategoryHoldBlog = blogData.filter(
    (blog) => blog.myCategory === card.name
  );

  return (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={card?.imageUrl ? card?.imageUrl : '/images/noImage.jpg'}
          title="categoryImage"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h6">
            {card?.name ? card?.name : 'title'}(
            {
              (activePage === 'my' ? myCategoryHoldBlog : categoryHoldBlog)
                .length
            }
            )
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
              <DeleteButton type="myCategory" id={card?.id} />
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

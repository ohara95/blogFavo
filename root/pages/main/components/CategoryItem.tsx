import React, { FC } from 'react';
import { FormValues } from '../../../../types';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { currentDisplayData, toastState } from '../../../../recoil/root';
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
import { DeleteButton } from '../../../components/DeleteButton';

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
  moveCard: {
    transitionDuration: '0.5s',
    '&:hover': {
      transform: 'scale(1.1,1.1)',
    },
  },
}));

type Props = {
  activePage: 'my' | 'user';
  blogData: FormValues[];
  id: string;
  imageUrl: string;
  name: string;
  setSelectCategory: (param: string) => void;
};

export const CategoryItem: FC<Props> = ({
  activePage,
  blogData,
  id,
  imageUrl,
  name,
  setSelectCategory,
}) => {
  const classes = useStyles();
  const setCurrentPage = useSetRecoilState(currentDisplayData);
  const setToast = useSetRecoilState(toastState);

  const categoryHoldBlog = blogData.filter(
    (blog) => blog.category === name && !blog.otherUserBlogId && !blog.isPrivate
  );
  const myCategoryHoldBlog = blogData.filter(
    (blog) => blog.myCategory === name
  );

  const categoryHasBlog = (name: string) => {
    if (activePage === 'user' && categoryHoldBlog.length) {
      setCurrentPage('userCategoryBlog');
      setSelectCategory(name);
    } else if (activePage === 'my' && myCategoryHoldBlog.length) {
      setCurrentPage('myCategoryBlog');
      setSelectCategory(name);
    } else {
      return setToast(['ブログはありません', 'error']);
    }
  };

  return (
    <Grid item key={id} xs={12} sm={6} md={4} className={classes.moveCard}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={imageUrl ? imageUrl : '/images/noImage.jpg'}
          title="categoryImage"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h6">
            {name ? name : 'title'}(
            {
              (activePage === 'my' ? myCategoryHoldBlog : categoryHoldBlog)
                .length
            }
            )
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              categoryHasBlog(name);
            }}
          >
            list
          </Button>
          {activePage === 'my' && (
            <>
              <Link href={`/categoryedit/${id}`}>
                <Button>edit</Button>
              </Link>
              <DeleteButton type="myCategory" id={id} />
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

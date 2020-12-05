import React, { FC } from 'react';
import { FormValues } from '../../../../types';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { currentDisplayData, toastState } from '../../../../recoil/root';
// material
import { Button, CardActions, Typography } from '@material-ui/core';
import { DeleteButton } from '../../../components/DeleteButton';
import {
  MoveCardGrid,
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
} from '../../../../styles/common';

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
      return setToast(['ブログはありません', 'warning']);
    }
  };

  return (
    <MoveCardGrid item key={id} xs={12} sm={6} md={4}>
      <StyledCard>
        <StyledCardMedia
          image={imageUrl ? imageUrl : '/images/noImage.jpg'}
          title="categoryImage"
        />
        <StyledCardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {name ? name : 'title'}(
            {
              (activePage === 'my' ? myCategoryHoldBlog : categoryHoldBlog)
                .length
            }
            )
          </Typography>
        </StyledCardContent>
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
      </StyledCard>
    </MoveCardGrid>
  );
};

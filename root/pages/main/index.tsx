import React, { FC, useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Category, FormValues } from '../../../types';
import { db, auth } from '../../utils/firebase';
import { currentDisplayData, activeDisplayData } from '../../../recoil/root';
import { useFirebase } from '../../utils/hooks';
import {
  ADD_BLOG,
  ADD_CATEGORY,
  RECOMMEND_REGISTER,
} from '../../../recoil/dialog';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AddButton } from '../../components/AddButton';
import { BlogDetail } from '../main/components/BlogDetail';
import { PageTop } from '../main/components/PageTop';
import { CategoryDetail } from '../main/components/CategoryDetail';
//material
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

const Main: FC = () => {
  const user = auth.currentUser;
  const currentDisplay = useRecoilValue(currentDisplayData);
  const blog = useFirebase<FormValues>('blog');
  const categoryList = useFirebase<Category>('categoryList');
  const [activePage, setActivePage] = useRecoilState(activeDisplayData);
  const [filterBlog, setFilterBlog] = useState<FormValues[]>([]);

  useEffect(() => {
    if (user) {
      db.collection('blog')
        .where('postedUser', '==', user.uid)
        .onSnapshot((snap) => {
          const docData = snap.docs.map((doc) => {
            return {
              ...(doc.data() as FormValues),
              id: doc.id,
            };
          });
          setFilterBlog(docData);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!user) setActivePage('user');
  }, [user]);

  const handleIconClick = (
    id: string | undefined,
    type: 'isFavo' | 'laterRead'
  ) => {
    blog.map((blog) => {
      if (blog.id === id) {
        db.collection('blog')
          .doc(id)
          .update({ [type]: !blog[type] });
      }
    });
  };

  const holdCategory = (data: FormValues[]) => {
    let arr: Category[] = [];
    for (let i = 0; i < data.length; i++) {
      categoryList.forEach((category) => {
        //一旦コメントアウト
        // if (category.name === data[i]?.category.name) {
        arr.push(category);
        // }
      });
    }
    return arr.filter((el, i, self) => self.indexOf(el) === i);
  };

  const dialogKey = user
    ? currentDisplay === 'list'
      ? ADD_BLOG
      : ADD_CATEGORY
    : RECOMMEND_REGISTER;

  return (
    <>
      <Header />
      <main>
        <PageTop title={currentDisplay} />
        {currentDisplay === 'list' ? (
          <BlogDetail
            activePage={activePage}
            handleIconClick={handleIconClick}
            data={user && activePage === 'my' ? filterBlog : blog}
          />
        ) : (
          <CategoryDetail
            data={activePage === 'my' ? holdCategory(blog) : categoryList}
            blogData={activePage === 'my' ? filterBlog : blog}
            activePage={activePage}
          />
        )}
      </main>
      <Grid container direction="row" justify="center" alignItems="center">
        <Pagination count={10} size="large" style={{ marginBottom: 20 }} />
      </Grid>
      <Footer />
      <AddButton dialogKey={dialogKey} />
    </>
  );
};

export default Main;

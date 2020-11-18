import React, { FC, useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { Category, FormValues } from '../../../types';
import { db, auth } from '../../utils/firebase';
import { currentDisplayData, activeDisplayData } from '../../../recoil/root';
import { useFirebase } from '../../utils/hooks';
import { ADD_BLOG, ADD_CATEGORY } from '../../../recoil/dialog';
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

  const deleteItem = (
    id: string | undefined,
    type: 'blog' | 'categoryList'
  ) => {
    db.collection(type).doc(id).delete();
  };

  const holdCategory = (data: FormValues[]) => {
    let arr: Category[] = [];
    for (let i = 0; i < data.length; i++) {
      categoryList.forEach((category) => {
        if (category.name === data[i]?.category) {
          arr.push(category);
        }
      });
    }
    return arr.filter((el, i, self) => self.indexOf(el) === i);
  };

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
            deleteItem={deleteItem}
          />
        ) : (
          <CategoryDetail
            data={activePage === 'my' ? holdCategory(filterBlog) : categoryList}
            blogData={activePage === 'my' ? filterBlog : blog}
            deleteItem={deleteItem}
            user={user}
          />
        )}
      </main>
      <Grid container direction="row" justify="center" alignItems="center">
        <Pagination count={10} size="large" style={{ marginBottom: 20 }} />
      </Grid>
      <Footer />
      <AddButton
        dialogKey={currentDisplay === 'list' ? ADD_BLOG : ADD_CATEGORY}
      />
    </>
  );
};

export default Main;

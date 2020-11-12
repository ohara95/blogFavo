import React, { FC, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Category, FormValues } from '../../../types';
import { db, auth } from '../../utils/firebase';
import { currentDisplayData, activeDisplayData } from '../../../recoil/root';
import { useFirebase } from '../../utils/hooks';
//components
import { Header, Footer, AddButton } from '../../components';
import { BlogDetail, PageTop, CategoryDetail } from '../main/components';
//material
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { ADD_BLOG, ADD_CATEGORY } from '../../../recoil/dialog';

const Main: FC = () => {
  const currentDisplay = useRecoilValue(currentDisplayData);
  const [blog] = useFirebase<FormValues>('blog');
  const [categoryList] = useFirebase<Category>('categoryList');
  const [activePage, setActivePage] = useRecoilState(activeDisplayData);
  const user = auth.currentUser;

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
          .update({ [type]: !blog.isFavo });
      }
    });
  };

  const filterData = (type: 'blog' | 'category') => {
    if (type === 'blog') {
      return blog.filter((db) =>
        db.postedUser?.onSnapshot((snap) => snap.id === user?.uid)
      );
    } else {
      return categoryList.filter((db) =>
        db.createdUser?.onSnapshot((snap) => snap.id === user?.uid)
      );
    }
  };

  const deleteItem = (
    id: string | undefined,
    type: 'blog' | 'categoryList'
  ) => {
    db.collection(type).doc(id).delete();
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
            data={
              user && activePage === 'my'
                ? blog && (filterData('blog') as FormValues[])
                : blog
            }
            deleteItem={deleteItem}
          />
        ) : (
          <CategoryDetail
            data={
              user && activePage === 'my'
                ? blog && (filterData('category') as Category[])
                : categoryList
            }
            blogData={blog}
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

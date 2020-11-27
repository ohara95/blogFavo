import React, { FC, useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Category, FormValues } from '../../../types';
import firebase, { db, auth } from '../../utils/firebase';
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
import { BlogList } from './components/BlogList';
import { PageTop } from '../main/components/PageTop';
import { CategoryDetail } from '../main/components/CategoryDetail';
//material
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

const Main: FC = () => {
  const user = auth.currentUser;
  const currentDisplay = useRecoilValue(currentDisplayData);
  const categoryList = useFirebase<Category>('categoryList');
  const blog = useFirebase<FormValues>('blog');
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

  const bookmarkToggle = (id: string) => {
    blog.forEach((fieldItem) => {
      if (fieldItem.id === id) {
        db.collection('blog')
          .doc(id)
          .update({ laterRead: !fieldItem.laterRead });
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

  const favToggle = async (id: string) => {
    const favRef = db.collection(`blog/${id}/favUsers`);

    const res = await (favRef && favRef.get());
    const data = res.docs.map((doc) => doc.id);

    const blogRef = db.doc(`blog/${id}`);
    if (!!data.find((db) => db === user?.uid)) {
      favRef.doc(user?.uid).delete();
      blogRef.update({
        favCount: firebase.firestore.FieldValue.increment(-1),
      });
    } else {
      favRef.doc(user?.uid).set({
        userRef: db.collection('users').doc(user?.uid),
      });
      blogRef.update({
        favCount: firebase.firestore.FieldValue.increment(1),
      });
    }
  };

  return (
    <>
      <Header />
      <main>
        <PageTop title={currentDisplay} />
        {currentDisplay === 'list' ? (
          <BlogList
            bookmarkToggle={bookmarkToggle}
            blogData={user && activePage === 'my' ? filterBlog : blog}
            favToggle={favToggle}
            isDisplay={user && activePage === 'my' ? true : false}
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

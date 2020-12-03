import React, { FC, useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Category, FormValues } from '../../../types';
import firebase, { db, auth } from '../../utils/firebase';
import { currentDisplayData, activeDisplayData } from '../../../recoil/root';
import { useCollection } from '../../utils/hooks';
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
import { CategoryList } from '../main/components/CategoryList';
//material
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

const Main: FC = () => {
  const user = auth.currentUser;
  const blog = useCollection<FormValues>('blog');
  const myCategory = useCollection<Category>(`users/${user?.uid}/myCategory`);
  const categoryList = useCollection<Category>('categoryList');
  const currentDisplay = useRecoilValue(currentDisplayData);
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

  const iconSwitch = async (
    id: string,
    type: 'favUsers' | 'laterReadUsers'
  ) => {
    const typeRef = db.collection(`blog/${id}/${type}`);
    const res = await typeRef.get();
    const userIdArr = res.docs.map((doc) => doc.id);
    const favUserIncrement = (num: number) => {
      db.doc(`blog/${id}`).update({
        favCount: firebase.firestore.FieldValue.increment(num),
      });
    };
    const isExistUser = userIdArr.find((id) => id === user?.uid);

    if (isExistUser) {
      typeRef.doc(user?.uid).delete();
      if (type === 'favUsers') favUserIncrement(-1);
      if (type === 'laterReadUsers') {
        const findId = blog.find((data) => data.otherUserBlogId === id)?.id;
        db.doc(`blog/${findId}`).delete();
      }
    } else {
      typeRef.doc(user?.uid).set({
        userRef: db.collection('users').doc(user?.uid),
      });
      if (type === 'favUsers') favUserIncrement(1);
      if (type === 'laterReadUsers') {
        const findBlog = blog.find((blogId) => blogId.id === id);
        await db.collection('blog').add({
          title: findBlog?.title,
          url: findBlog?.url,
          memo: findBlog?.memo,
          category: findBlog?.category,
          tag: [],
          isPrivate: false,
          postedUser: user?.uid,
          postedAt: firebase.firestore.Timestamp.now(),
          otherUserBlogId: id,
        });
      }
    }
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
          <BlogList
            data={
              user && activePage === 'my'
                ? filterBlog
                : blog
                    ?.filter((display) => !display?.isPrivate)
                    ?.filter((display) => !display.otherUserBlogId)
            }
            iconSwitch={iconSwitch}
            isDisplay={user && activePage === 'my' ? true : false}
          />
        ) : (
          <CategoryList
            activePage={activePage}
            blogData={activePage === 'my' ? filterBlog : blog}
            data={activePage === 'my' ? myCategory && myCategory : categoryList}
          />
        )}
      </main>
      <Grid container direction="row" justify="center" alignItems="center">
        <Pagination count={10} size="large" css="margin-Bottom: 20px" />
      </Grid>
      <Footer />
      {(activePage !== 'user' || currentDisplay !== 'category') && (
        <AddButton dialogKey={dialogKey} />
      )}
    </>
  );
};

export default Main;

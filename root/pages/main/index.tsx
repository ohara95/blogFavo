import React, { FC, useState, useEffect } from 'react';
import { Category, FormValues } from '../../../types';
//recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  ADD_BLOG,
  ADD_CATEGORY,
  RECOMMEND_REGISTER,
} from '../../../recoil/dialog';
import {
  currentDisplayData,
  activeDisplayData,
  searchData,
} from '../../../recoil/root';
//utils
import firebase, { db, auth } from '../../utils/firebase';
import { useOrderby } from '../../utils/hooks';
//components
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
  const blog = useOrderby<FormValues>('blog', 'favCount', 'desc');
  const myCategory = useOrderby<Category>(
    `users/${user?.uid}/myCategory`,
    'name',
    'asc'
  );
  const categoryList = useOrderby<Category>('categoryList', 'name', 'asc');
  const currentDisplay = useRecoilValue(currentDisplayData);
  const searchValue = useRecoilValue(searchData);
  const [activePage, setActivePage] = useRecoilState(activeDisplayData);
  const [onlyMyBlog, setOnlyMyBlog] = useState<FormValues[]>([]);
  const [selectCategory, setSelectCategory] = useState('');

  useEffect(() => {
    if (user) {
      db.collection('blog')
        .orderBy('priority', 'desc')
        .where('postedUser', '==', user.uid)
        .onSnapshot((snap) => {
          const docData = snap.docs.map((doc) => {
            return {
              ...(doc.data() as FormValues),
              id: doc.id,
            };
          });
          setOnlyMyBlog(docData);
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
      onSwitch(typeRef, favUserIncrement, type, id);
    } else {
      offSwitch(typeRef, favUserIncrement, type, id);
    }
  };

  const onSwitch = (
    typeRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    decrement: (num: number) => void,
    type: 'favUsers' | 'laterReadUsers',
    id: string
  ) => {
    typeRef.doc(user?.uid).delete();
    if (type === 'favUsers') decrement(-1);
    if (type === 'laterReadUsers') {
      const findId = blog.find((data) => data.otherUserBlogId === id)?.id;
      db.doc(`blog/${findId}`).delete();
    }
  };

  const offSwitch = async (
    typeRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    increment: (num: number) => void,
    type: 'favUsers' | 'laterReadUsers',
    id: string
  ) => {
    typeRef.doc(user?.uid).set({
      userRef: db.collection('users').doc(user?.uid),
    });
    if (type === 'favUsers') increment(1);
    if (type === 'laterReadUsers') {
      const findBlog = blog.find((blogId) => blogId.id === id);
      await db.collection('blog').add({
        title: findBlog?.title,
        url: findBlog?.url,
        memo: '',
        category: findBlog?.category,
        tag: [],
        isPrivate: false,
        postedUser: user?.uid,
        postedAt: firebase.firestore.Timestamp.now(),
        otherUserBlogId: id,
      });
    }
  };

  const dialogKey = user
    ? currentDisplay === 'list'
      ? ADD_BLOG
      : ADD_CATEGORY
    : RECOMMEND_REGISTER;

  const switchMyPageDisplay = (
    currentPage: 'list' | 'yet' | 'done' | 'userCategoryBlog' | 'myCategoryBlog'
  ) => {
    switch (currentPage) {
      case 'yet':
        const yetBlog = onlyMyBlog.filter((item) => !item.isDone);
        return searchBlogResult(yetBlog);
      case 'done':
        const doneBlog = onlyMyBlog.filter((item) => item.isDone);
        return searchBlogResult(doneBlog);
      case 'myCategoryBlog':
        const categoryBlog = onlyMyBlog.filter(
          (item) => item.myCategory === selectCategory
        );
        return searchBlogResult(categoryBlog);
      case 'list':
        return searchBlogResult(onlyMyBlog);
      default:
        return;
    }
  };

  const switchUserPageDisplay = (
    currentPage: 'list' | 'yet' | 'done' | 'userCategoryBlog' | 'myCategoryBlog'
  ) => {
    switch (currentPage) {
      case 'userCategoryBlog':
        const displayCategoryBlog = blog?.filter(
          (item) =>
            !item?.isPrivate &&
            !item.otherUserBlogId &&
            item.category === selectCategory
        );
        return searchBlogResult(displayCategoryBlog);
      default:
        const displayBlog = blog?.filter(
          (item) => !item?.isPrivate && !item.otherUserBlogId
        );
        return searchBlogResult(displayBlog);
    }
  };
  //* カテゴリーの検索フィルター **/
  const searchCategoryResult = (searchItem: Category[]) => {
    return searchItem.filter((item) => item.name.includes(searchValue));
  };
  //** ブログの検索フィルター*/
  const searchBlogResult = (searchItem: FormValues[]) => {
    return searchItem.filter(
      (item) =>
        item.title.includes(searchValue) ||
        item.memo.includes(searchValue) ||
        item.tag.includes(searchValue)
    );
  };

  return (
    <>
      <Header />
      <main>
        <PageTop
          title={currentDisplay}
          categoryLength={myCategory.length}
          yetBlogLength={onlyMyBlog.filter((item) => !item.isDone).length}
          doneBlogLength={onlyMyBlog.filter((item) => item.isDone).length}
        />
        {currentDisplay !== 'category' ? (
          <BlogList
            data={
              user && activePage === 'my'
                ? switchMyPageDisplay(currentDisplay)
                : switchUserPageDisplay(currentDisplay)
            }
            iconSwitch={iconSwitch}
            isDisplay={user && activePage === 'my' ? true : false}
          />
        ) : (
          <CategoryList
            activePage={activePage}
            blogData={activePage === 'my' ? onlyMyBlog : blog}
            data={
              activePage === 'my'
                ? searchCategoryResult(myCategory)
                : searchCategoryResult(categoryList)
            }
            setSelectCategory={setSelectCategory}
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

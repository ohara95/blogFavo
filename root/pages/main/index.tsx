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
import { db, auth } from '../../utils/firebase';
import { useOrderby } from '../../utils/hooks';
import { useIconSwitch } from './utils/hooks/useIconSwitch';
import { displayPage } from './utils/displayPage';
import { usePagination } from './utils/hooks/usePagination';
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
  const iconSwitch = useIconSwitch(blog);
  const [activePage, setActivePage] = useRecoilState(activeDisplayData);
  const [onlyMyBlog, setOnlyMyBlog] = useState<FormValues[]>([]);
  const [selectCategory, setSelectCategory] = useState('');

  const {
    switchMyPageDisplay,
    switchUserPageDisplay,
    searchCategoryResult,
  } = displayPage(searchValue, onlyMyBlog, selectCategory, blog);

  const { page, setPage, paginate, pageCount } = usePagination(
    currentDisplay,
    activePage,
    myCategory,
    categoryList,
    switchMyPageDisplay,
    switchUserPageDisplay
  );

  useEffect(() => {
    if (user) {
      db.collection('blog')
        .where('postedUser', '==', user.uid)
        .orderBy('priority', 'desc')
        .onSnapshot((snap) => {
          const docData = snap.docs.map((doc) => {
            return {
              ...(doc.data() as FormValues),
              id: doc.id,
            };
          });
          setOnlyMyBlog(docData);
        });
    } else {
      setActivePage('user');
    }
  }, [user]);

  useEffect(() => {
    if (!user) setActivePage('user');
  }, [user]);

  const dialogKey = user
    ? currentDisplay === 'list'
      ? ADD_BLOG
      : ADD_CATEGORY
    : RECOMMEND_REGISTER;

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
                ? paginate(switchMyPageDisplay(currentDisplay))
                : paginate(switchUserPageDisplay(currentDisplay))
            }
            iconSwitch={iconSwitch}
            isDisplay={user && activePage === 'my' ? true : false}
          />
        ) : (
          <CategoryList
            activePage={activePage}
            blogData={
              activePage === 'my'
                ? onlyMyBlog
                : blog?.filter((item) => !item?.isPrivate)
            }
            data={
              activePage === 'my'
                ? paginate(searchCategoryResult(myCategory))
                : paginate(searchCategoryResult(categoryList))
            }
            setSelectCategory={setSelectCategory}
          />
        )}
      </main>
      {pageCount() > 0 && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Pagination
            count={pageCount()}
            size="large"
            css="margin-Bottom: 20px"
            page={page}
            onChange={(_, value: number) => {
              setPage(value);
            }}
          />
        </Grid>
      )}
      <Footer />
      {(activePage !== 'user' || currentDisplay !== 'category') && (
        <AddButton dialogKey={dialogKey} />
      )}
    </>
  );
};

export default Main;

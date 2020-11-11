import React, { FC, useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { Category, FormValues } from '../../../types';
import firebase, { db, auth } from '../../utils/firebase';
import {
  addTags,
  addCategory,
  currentDisplayData,
  imageData,
  activeDisplayData,
} from '../../../recoil/root';
import { useFirebase } from '../../utils/hooks';
//components
import { Header, Footer, AddButton } from '../../components';
import { BlogDetail, PageTop, CategoryDetail } from '../main/components';
//material
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

const Main: FC = () => {
  const [open, setOpen] = useState(false);
  const tag = useRecoilValue(addTags);
  const category = useRecoilValue(addCategory);
  const currentDisplay = useRecoilValue(currentDisplayData);
  const [blog] = useFirebase<FormValues>('blog');
  const [categoryList] = useFirebase<Category>('categoryList');
  const [imageUrl, setImageUrl] = useRecoilState(imageData);
  const [activePage, setActivePage] = useRecoilState(activeDisplayData);
  const user = auth.currentUser;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, errors, control, handleSubmit, reset } = useForm<
    FormValues
  >();

  useEffect(() => {
    if (!user) setActivePage('user');
  }, [user]);

  const onSubmit = async (data: FormValues) => {
    if (currentDisplay === 'list') {
      try {
        await db.collection('blog').add({
          title: data.title,
          url: data.url,
          memo: data.memo,
          category,
          tag,
          isPublic: data.isPublic,
          postedUser: db.collection('users').doc(user?.uid),
          postedAt: firebase.firestore.Timestamp.now(),
          isFavo: false,
          laterRead: false,
        });
        alert('追加出来ました！');
        reset();
        //memo 送信したらボタン選択解除したい
        //(連続で追加する場合によくないので)
        await db
          .collection('tags')
          .get()
          .then((res) =>
            res.docs.map((doc) => doc.ref.update({ isChecked: false }))
          );
      } catch (err) {
        console.log(err);
      }
    }
    if (currentDisplay === 'category') {
      try {
        if (categoryList.find((db) => db.name === data.category)) {
          return alert('カテゴリー名が存在します');
        }
        await db.collection('categoryList').add({
          name: data.category,
          imageUrl,
          createdUser: db.collection('users').doc(user?.uid),
        });
        alert('追加出来ました！');
        reset();
        setImageUrl('');
      } catch (err) {
        console.log(err);
      }
    }
  };

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
        onClickOpen={handleOpen}
        open={open}
        onClickClose={handleClose}
        title={currentDisplay === 'list' ? 'ブログ追加' : 'カテゴリー追加'}
        register={register}
        errors={errors}
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default Main;

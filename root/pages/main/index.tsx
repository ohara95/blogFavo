import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Category, FormValues } from '../../../types';
import { db } from '../utils/firebase';
import { useRecoilValue } from 'recoil';
import { addTags, addCategory, currentDisplayData } from '../../../recoil/root';
import useFirebase from '../utils/hooks/useFirebase';

//components
import { Header, Footer, AddButton } from '../../components';
import { BlogDetail, PageTop, CategoryDetail } from '../main/components';

const Main: FC = () => {
  const [open, setOpen] = useState(false);
  const tag = useRecoilValue(addTags);
  const category = useRecoilValue(addCategory);
  const currentDisplay = useRecoilValue(currentDisplayData);
  const [blog] = useFirebase<FormValues>('blog');
  const [categoryList] = useFirebase<Category>('categoryList');

  const data = [{ name: 'category', id: 'dfghj' }];

  const displayData = (current: string) => {
    if (!blog) return;
    if (current === 'list') {
      return blog;
    } else if (current === 'category') {
      return data;
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, errors, control, handleSubmit, reset } = useForm<
    FormValues
  >();

  const onSubmit = (data: FormValues) => {
    db.collection('blog')
      .add({
        title: data.title,
        url: data.url,
        memo: data.memo,
        category,
        tag,
        isPublic: data.isPublic,
      })
      .then(() => {
        reset();
        //memo 送信したらボタン選択解除したい
        //(連続で追加する場合によくないので)
        db.collection('tags')
          .get()
          .then((res) =>
            res.docs.map((doc) => doc.ref.update({ isChecked: false }))
          );
        alert('追加出来ました！');
      });
  };

  return (
    <>
      <Header />
      <main>
        <PageTop title="blogFavo" />
        {currentDisplay === 'list' ? (
          <BlogDetail data={blog} />
        ) : (
          <CategoryDetail data={categoryList} number={categoryList.length} />
        )}
      </main>
      <Footer />
      <AddButton
        onClickOpen={handleOpen}
        open={open}
        onClickClose={handleClose}
        title="ブログ追加"
        register={register}
        errors={errors}
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default Main;

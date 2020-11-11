import React, { FC, useState } from 'react';
import { Category, FormValues } from '../../../types';

import { db } from '../../utils/firebase';
import { useRecoilValue,useRecoilState  } from 'recoil';
import { addTags, addCategory, currentDisplayData,imageData } from '../../../recoil/root';
import { useFirebase } from '../../utils/hooks';

//components
import { Header, Footer, AddButton } from '../../components';
import { BlogDetail, PageTop, CategoryDetail } from '../main/components';

const Main: FC = () => {
  const [open, setOpen] = useState(false);
  const currentDisplay = useRecoilValue(currentDisplayData);
  const [blog] = useFirebase<FormValues>('blog');
  const [categoryList] = useFirebase<Category>('categoryList');
  const [imageUrl, setImageUrl] = useRecoilState(imageData);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, errors, control, handleSubmit, reset } = useForm<
    FormValues
  >();

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
          url: imageUrl,
        });
        alert('追加出来ました！');
        reset();
        setImageUrl('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const categoryName = categoryList.find((db) => db)?.name;
  const categoryAmount = blog.filter((db) => db.category === categoryName)
    .length;
  console.log(categoryName);

  return (
    <>
      <Header />
      <main>
        <PageTop title="blogFavo" />
        {currentDisplay === 'list' ? (
          <BlogDetail data={blog} />
        ) : (
          <CategoryDetail data={categoryList} blogData={blog} />
        )}
      </main>
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

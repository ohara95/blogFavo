import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../types';
import { db } from '../../config/firebase';
//components
import Header from '../organisms/Header';
import PageTop from '../template/PageTop';
import Footer from '../organisms/Footer';
import AddButton from '../atoms/AddButton';

const Main: FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, errors, control, handleSubmit, reset } = useForm<
    FormValues
  >();

  const onSubmit = (data: FormValues) => {
    console.log(data);

    db.collection('blog')
      .add({
        title: data.title,
        url: data.url,
        memo: data.memo,
        category: data.category,
        isPublic: data.isPublic,
      })
      .then(() => {
        reset();
        //memo 送信したらボタン選択解除したい
        //連続で追加する場合によくない
        // db.collection('tags')
        //   .get()
        //   .then((res) =>
        //     res.docs.map((doc) => doc.ref.update({ isChecked: false }))
        //   );
        alert('追加出来ました！');
      });
  };

  return (
    <>
      <Header />
      <main>
        <PageTop title="blogFavo" />
        {children}
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

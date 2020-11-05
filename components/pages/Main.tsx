import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../types';
import { db } from '../../config/firebase';
import { useRecoilValue } from 'recoil';
import { addTags, addCategory } from '../../recoil/root';
//components
import { Header, Footer } from '../organisms';
import PageTop from '../template/PageTop';
import { AddButton } from '../atoms';

const Main: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const tag = useRecoilValue(addTags);
  const category = useRecoilValue(addCategory);

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

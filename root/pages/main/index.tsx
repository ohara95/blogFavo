import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../../types';
import { db } from '../utils/firebase';
import { useRecoilValue } from 'recoil';
import { addTags, addCategory } from '../../../recoil/root';
import PageDetail from '../main/components/PageDetail';
//components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageTop from '../main/components/PageTop';
import AddButton from '../../components/AddButton';

const Main: FC = () => {
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

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <Header />
      <main>
        <PageTop title="blogFavo" />
        <PageDetail data={data} title="title" memo="memo" tag="tag" />;
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

import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../recoil/root';
import { Category, FormValues } from '../../types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
//utils
import { ImageUpload } from '../../root/utils/ImageUpload';
import { db, storage, auth } from '../../root/utils/firebase';
import { useCollection } from '../../root/utils/hooks';
import { NORMAL_VALIDATION } from '../../root/utils/validation';
//component
import { EditBase } from '../../root/components/EditBase';
import { InputWithLabel } from '../../root/components/InputWithLabel';
import { AddBlogSelector } from '../../root/components/AddBlogSelector';
//styled
import { LabelText } from '../../styles/common';
import styled from 'styled-components';
import { COLOR } from '../../styles/color';
//material
import { Button } from '@material-ui/core';

type FormData = {
  category: string;
};

const EditCategory = () => {
  const router = useRouter();
  const user = auth.currentUser;
  const myCategory = useCollection<Category>(`users/${user?.uid}/myCategory`);
  const blog = useCollection<FormValues>(`blog`);
  const setToast = useSetRecoilState(toastState);
  const { id } = router.query;
  const { register, errors, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState('');
  const [addBlog, setAddBlog] = useState<FormValues[] | null>(null);

  const findCategory = myCategory.find((db) => db.id === id);
  const notDivideMyCategory = blog.filter(
    (item) => item.postedUser === user?.uid && !item.myCategory
  );

  useEffect(() => {
    if (findCategory?.imageUrl) setImageUrl(findCategory.imageUrl);
  }, [findCategory]);

  useEffect(() => {
    if (findCategory) {
      reset({
        category: findCategory.name,
      });
    }
  }, [reset, findCategory]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      ImageUpload(file, setImageUrl);
    }
  };

  const deleteImage = async () => {
    if (imageUrl) storage.refFromURL(imageUrl).delete();
    setImageUrl('');
    if (typeof id === 'string') {
      db.doc(`users/${user?.uid}/myCategory/${id as string}`).update({
        imageUrl: '',
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await db.collection('blog').get();
      res.forEach((doc) => {
        addBlog?.forEach((blog) => {
          if (doc.id === blog.id) {
            doc.ref.update({ myCategory: data.category });
          }
        });
      });
      if (myCategory.find((my) => my.name === data.category)) {
        if (findCategory?.name !== data.category) {
          return setToast(['カテゴリー名が存在します', 'error']);
        }
      }
      if (typeof id === 'string') {
        await db
          .collection('blog')
          .where('postedUser', '==', user?.uid)
          .onSnapshot((snap) => {
            snap.forEach((doc) => {
              if (
                doc.data().myCategory ===
                myCategory.find((category) => category.id === id)?.name
              ) {
                doc.ref.update({ myCategory: data.category });
              }
            });
          });

        await db.doc(`users/${user?.uid}/myCategory/${id}`).update({
          name: data.category,
          imageUrl: imageUrl ? imageUrl : '',
        });
      }
      setToast(['変更出来ました！']);
      router.back();
    } catch (err) {
      setToast(['失敗しました', 'error']);
      console.log(err);
    }
  };

  return (
    <EditBase handleSubmit={handleSubmit(onSubmit)} title="カテゴリー編集">
      <InputWithLabel
        name="category"
        inputRef={register(NORMAL_VALIDATION)}
        error={errors.category}
        label="カテゴリー名*"
      />
      {!!notDivideMyCategory.length && (
        <AddBlogSelector setBlog={setAddBlog} options={notDivideMyCategory} />
      )}
      <ActionsWrapper>
        <LabelText>カテゴリー画像登録</LabelText>
        <InputHidden
          accept="image/*"
          multiple
          id="contained-button-file"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="contained-button-file">
          <UploadButton component="span" variant="contained">
            change
          </UploadButton>
        </label>
        <DeleteButton variant="contained" onClick={deleteImage}>
          取消
        </DeleteButton>
      </ActionsWrapper>
      {imageUrl && <Img src={imageUrl} />}
    </EditBase>
  );
};

export default EditCategory;

const InputHidden = styled.input`
  display: none;
`;

const UploadButton = styled(Button)<{ component: string }>`
  background-color: ${COLOR.MAIN};
  color: ${COLOR.WHITE};
  margin: 10px;
`;

const DeleteButton = styled(Button)`
  background-color: ${COLOR.RED};
  color: ${COLOR.WHITE};
`;

const Img = styled.img`
  width: 50%;
  display: block;
  margin: 0 auto;
`;

const ActionsWrapper = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
`;

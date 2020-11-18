import React, { useState, useEffect } from 'react';
import { ImageUpload } from '../../root/utils/ImageUpload';
import { db, storage } from '../../root/utils/firebase';
import { InputWithLabel } from '../../root/components/InputWithLabel';
import { useFirebase } from '../../root/utils/hooks';
import { Category, FormValues } from '../../types';
import { useForm } from 'react-hook-form';
import { LabelText } from '../../styles/common';
import styled from 'styled-components';
import { COLOR } from '../../styles/color';
import { useRouter } from 'next/router';
import { EditBase } from '../../root/components/EditBase';
//material
import { Button } from '@material-ui/core';

type FormData = {
  category: string;
};

const EditCategory = () => {
  const blog = useFirebase<FormValues>('blog');
  const categoryList = useFirebase<Category>('categoryList');
  const router = useRouter();
  const { id } = router.query;
  const [imageUrl, setImageUrl] = useState('');
  const { register, errors, handleSubmit, control, reset } = useForm<FormData>({
    mode: 'onBlur',
  });
  const categoryDetail = categoryList?.find((db) => db.id === id);

  useEffect(() => {
    if (categoryDetail?.imageUrl) {
      setImageUrl(categoryDetail?.imageUrl);
    }
  }, [categoryDetail]);

  useEffect(() => {
    if (categoryDetail) {
      reset({
        category: categoryDetail.name,
      });
    }
  }, [reset, categoryDetail]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      ImageUpload(file, setImageUrl);
    }
  };

  const deleteImage = () => {
    if (imageUrl) storage.refFromURL(imageUrl).delete();
    setImageUrl('');
    if (typeof id === 'string') {
      db.collection('categoryList').doc(id).update({ imageUrl: '' });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (categoryDetail?.name === data.category) {
        if (categoryDetail?.name !== data.category) {
          return alert('カテゴリー名が存在します');
        }
      }
      if (typeof id === 'string') {
        await db.collection('categoryList').doc(id).update({
          name: data.category,
          imageUrl,
        });
      }
      if (blog) {
        const blogFilter = await db
          .collection('blog')
          .where('category', '==', categoryDetail?.name)
          .get();
        blogFilter.docs.map((doc) =>
          doc.ref.update({
            category: data.category,
          })
        );
      }
      router.back();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EditBase handleSubmit={handleSubmit(onSubmit)} title="カテゴリー編集">
      <InputWithLabel
        name="category"
        control={control}
        inputRef={register({
          required: '必須項目です',
        })}
        error={errors.category}
        label="カテゴリー名*"
      />
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
  background-color: ${COLOR.TURQUOISE};
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

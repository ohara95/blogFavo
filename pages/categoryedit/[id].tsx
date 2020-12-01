import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../recoil/root';
import { Category } from '../../types';
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
  const { id } = router.query;
  const { register, errors, handleSubmit, reset } = useForm<FormData>();
  const user = auth.currentUser;
  const [imageUrl, setImageUrl] = useState('');

  const myCategory = useCollection<Category>(`users/${user?.uid}/myCategory`);
  const findCategory = myCategory.find((db) => db.id === id);
  const setToast = useSetRecoilState(toastState);

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

  const deleteImage = () => {
    if (imageUrl) storage.refFromURL(imageUrl).delete();
    setImageUrl('');
    if (typeof id === 'string') {
      db.doc(`users/${user?.uid}/myCategory/${id}`).update({ imageUrl: '' });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (myCategory.find((my) => my.name === data.category)) {
        if (findCategory?.name !== data.category) {
          return setToast(['カテゴリー名が存在します', 'error']);
        }
      }
      if (typeof id === 'string') {
        await db
          .collection('blog')
          .doc(id)
          .update({ myCategory: data.category });
        await db.doc(`users/${user?.uid}/myCategory/${id}`).update({
          name: data.category,
          imageUrl: imageUrl ? imageUrl : '',
        });
      }
      setToast(['変更出来ました！']);
      router.back();
    } catch (err) {
      setToast(['失敗しました', 'error']);
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

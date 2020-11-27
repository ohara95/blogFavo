import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../recoil/root';
import { ImageUpload } from '../utils/ImageUpload';
import { db, storage, auth } from '../utils/firebase';
import { DialogBase } from '../components/DialogBase';
import { InputWithLabel } from '../components/InputWithLabel';
import { useFirebase } from '../utils/hooks';
import { Category } from '../../types';
import { ADD_CATEGORY } from '../../recoil/dialog';
import { useForm } from 'react-hook-form';
import { LabelText } from '../../styles/common';
import styled from 'styled-components';
import { COLOR } from '../../styles/color';
//material
import { Button } from '@material-ui/core';
import { NORMAL_VALIDATION } from '../utils/validation';

type FormData = {
  category: string;
};

export const AddCategoryDialog = () => {
  const categoryList = useFirebase<Category>('categoryList');
  const [imageUrl, setImageUrl] = useState('');
  const user = auth.currentUser;
  const { register, errors, handleSubmit, reset } = useForm<FormData>();
  const setToast = useSetRecoilState(toastState);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      ImageUpload(file, setImageUrl);
    }
  };

  const deleteImage = () => {
    if (imageUrl) storage.refFromURL(imageUrl).delete();
    setImageUrl('');
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (categoryList.find((db) => db.name === data.category)) {
        return setToast(['カテゴリー名が存在します', 'error']);
      }
      await db.collection('categoryList').add({
        name: data.category,
        imageUrl,
        createdUser: db.collection('users').doc(user?.uid),
      });
      setToast(['追加出来ました！']);
      reset();
      setImageUrl('');
    } catch (err) {
      setToast(['追加に失敗しました', 'error']);
    }
  };

  return (
    <DialogBase
      title="カテゴリー追加"
      dialogKey={ADD_CATEGORY}
      handleSubmit={handleSubmit(onSubmit)}
    >
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
            Upload
          </UploadButton>
        </label>
        <DeleteButton variant="contained" onClick={deleteImage}>
          取消
        </DeleteButton>
      </ActionsWrapper>
      {imageUrl && <Img src={imageUrl} />}
    </DialogBase>
  );
};

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

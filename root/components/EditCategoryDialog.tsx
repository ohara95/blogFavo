import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ImageUpload } from '../utils/ImageUpload';
import { db, storage } from '../utils/firebase';
import { DialogBase, InputWithLabel } from '../components';
import { useFirebase } from '../utils/hooks';
import { Category } from '../../types';
import { useForm } from 'react-hook-form';
import { LabelText } from '../../styles/common';
import styled from 'styled-components';
import { COLOR } from '../../styles/color';
import { EDIT_CATEGORY, dialogData } from '../../recoil/dialog';
//material
import { Button } from '@material-ui/core';

type FormData = {
  category: string;
};

export const EditCategoryDialog = () => {
  const categoryList = useFirebase<Category>('categoryList');
  const [dialog, setDialog] = useRecoilState(dialogData);
  const categoryDetail = categoryList.find(
    (db) => db.id === dialog.editCategory.id
  );
  const [imageUrl, setImageUrl] = useState('');
  const { register, errors, handleSubmit } = useForm<FormData>();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      ImageUpload(file, setImageUrl);
    }
  };

  const deleteImage = () => {
    if (imageUrl) storage.refFromURL(imageUrl).delete();
    setImageUrl('');
    db.collection('categoryList')
      .doc(dialog.editCategory.id)
      .update({ imageUrl: '' });
  };
  useEffect(() => {
    if (categoryDetail?.imageUrl) {
      setImageUrl(categoryDetail?.imageUrl);
    }
  }, [categoryDetail]);

  const onSubmit = async (data: FormData) => {
    try {
      if (categoryList.find((db) => db.name === data.category)) {
        if (categoryDetail?.name !== data.category) {
          return alert('カテゴリー名が存在します');
        }
      }
      await db.collection('categoryList').doc(dialog.editCategory.id).update({
        name: data.category,
        imageUrl,
      });
      setDialog((prev) => ({
        ...prev,
        [EDIT_CATEGORY]: {
          isDisplay: false,
          id: '',
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DialogBase
      title="カテゴリー編集"
      dialogKey={EDIT_CATEGORY}
      handleSubmit={handleSubmit(onSubmit)}
      doneText="変更"
    >
      <InputWithLabel
        name="category"
        inputRef={register({
          required: '必須項目です',
        })}
        error={errors.category}
        label="カテゴリー名*"
        placeholder={categoryDetail?.name}
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
    </DialogBase>
  );
};

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

import React from 'react';
import { useRecoilState } from 'recoil';
import { imageData } from '../../recoil/root';
import { ImageUpload } from '../utils/ImageUpload';
import { auth, db, storage } from '../utils/firebase';

//material
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { DialogBase } from './DialogBase';
import { InputWithLabel } from './InputWithLabel';
import { useFirebase } from '../utils/hooks';
import { Category } from '../../types';
import { ADD_CATEGORY } from '../../recoil/dialog';
import { useForm } from 'react-hook-form';

type FormData = {
  category: string;
};

export const AddCategoryDialog = () => {
  const [categoryList] = useFirebase<Category>('categoryList');
  const [imageUrl, setImageUrl] = useRecoilState(imageData);
  const user = auth.currentUser;
  const { register, errors, handleSubmit, reset } = useForm<FormData>();

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
        return alert('カテゴリー名が存在します');
      }
      await db.collection('categoryList').add({
        name: data.category,
        imageUrl,
        createdUser: db.collection('users').doc(user?.uid),
      });
      alert('追加出来ました！');
      reset();
      setImageUrl('');
    } catch (err) {
      console.log(err);
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
        inputRef={register({
          required: '必須項目です',
        })}
        error={errors.category}
        label="カテゴリー名*"
      />
      <InputLabel>カテゴリー画像登録</InputLabel>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" style={{ marginLeft: 10 }}>
          Upload
        </Button>
      </label>
      <Button
        variant="contained"
        component="span"
        style={{ marginLeft: 10 }}
        onClick={deleteImage}
      >
        取消
      </Button>
      {imageUrl && <img src={imageUrl} style={{ width: '50%' }} />}
    </DialogBase>
  );
};

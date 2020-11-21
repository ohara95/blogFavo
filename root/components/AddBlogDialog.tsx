import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Category, FormValues, InputType } from '../../types';
import { DialogBase } from '../components/DialogBase';
import { Tag } from '../components/Tag';
import { InputWithLabel } from '../components/InputWithLabel';
import { CategorySelector } from '../components/CategorySelector';
import { ADD_BLOG } from '../../recoil/dialog';
import firebase, { auth, db } from '../utils/firebase';
import { Label, LabelText } from '../../styles/common';

//material
import { Checkbox } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../recoil/root';
import { useFirebase } from '../utils/hooks';
import { NORMAL_VALIDATION } from '../utils/validation';

export const AddBlogDialog = () => {
  const {
    register,
    errors,
    handleSubmit,
    reset,
    control,
  } = useForm<FormValues>({ mode: 'onBlur' });
  const [tag, setTag] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const categoryList = useFirebase<Category>('categoryList');
  const user = auth.currentUser;
  const setToast = useSetRecoilState(toastState);

  const onSubmit = async (data: FormValues) => {
    try {
      await db.collection('blog').add({
        title: data.title,
        url: data.url,
        memo: data.memo,
        category: {
          name: category ? category.name : null,
          id: categoryList.find((db) => db.name === category?.name)?.id,
        },
        tag,
        isPublic,
        postedUser: user?.uid,
        postedAt: firebase.firestore.Timestamp.now(),
        isFavo: false,
        laterRead: false,
      });

      const res = await db.collection('tags').get();
      res.docs.map((doc) => doc.ref.update({ isChecked: false }));
      setToast(['追加出来ました！']);
      setCategory(null);
      setTag([]);
      setIsPublic(false);
      reset();
    } catch (error) {
      setToast(['追加に失敗しました', 'error']);
    }
  };

  const inputList: InputType[] = [
    {
      name: 'title',
      label: 'Title*',
      error: errors.title,
      control,
      inputRef: register(NORMAL_VALIDATION),
    },
    {
      name: 'url',
      label: 'URL*',
      error: errors.url,
      control,
      inputRef: register({
        required: '必須項目です',
        pattern: {
          value: /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g,
          message: '正しい書式で入力してください',
        },
      }),
    },
    {
      name: 'memo',
      label: 'Memo',
      variant: 'outlined',
      control,
      multiline: true,
      rows: 5,
      error: errors.memo,
      inputRef: register(NORMAL_VALIDATION),
    },
  ];

  return (
    <DialogBase
      title="ブログ追加"
      handleSubmit={handleSubmit(onSubmit)}
      dialogKey={ADD_BLOG}
    >
      {inputList.map((props) => (
        <InputWithLabel key={props.name} {...props} />
      ))}
      <CategorySelector category={category} setCategory={setCategory} />
      <Tag tag={tag} setTag={setTag} />
      <Label>
        <label css="display: flex">
          <LabelText>非公開</LabelText>
          <Checkbox
            color="primary"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label>
      </Label>
    </DialogBase>
  );
};

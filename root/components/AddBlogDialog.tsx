import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Category, FormValues, InputType } from '../../types';
import {
  DialogBase,
  Tag,
  InputWithLabel,
  CategorySelector,
} from '../components';
import { ADD_BLOG } from '../../recoil/dialog';
import firebase, { auth, db } from '../utils/firebase';
import { Label, LabelText, FlexLabel } from '../../styles/common';
import { useFirebase } from '../utils/hooks';

//material
import { Checkbox } from '@material-ui/core';

export const AddBlogDialog = () => {
  const { register, errors, handleSubmit, reset, control } = useForm<
    FormValues
  >({ mode: 'onBlur' });
  const [tag, setTag] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const user = auth.currentUser;

  const onSubmit = async (data: FormValues) => {
    try {
      await db.collection('blog').add({
        title: data.title,
        url: data.url,
        memo: data.memo,
        category: category?.name,
        tag,
        isPublic,
        postedUser: db.collection('users').doc(user?.uid),
        postedAt: firebase.firestore.Timestamp.now(),
        isFavo: false,
        laterRead: false,
      });
      alert('追加出来ました！');
      setCategory(null);
      setTag([]);
      setIsPublic(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const inputList: InputType[] = [
    {
      name: 'title',
      label: 'Title*',
      error: errors.title,
      control,
      inputRef: register({
        required: '必須項目です',
      }),
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
      inputRef: register,
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
        <FlexLabel>
          <LabelText>非公開</LabelText>
          <Checkbox
            color="primary"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </FlexLabel>
      </Label>
    </DialogBase>
  );
};

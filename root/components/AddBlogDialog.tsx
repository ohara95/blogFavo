import React from 'react';
//material
import { useForm } from 'react-hook-form';
import { Category, FormValues, InputType } from '../../types';
import { useState } from 'react';
import { DialogBase } from './DialogBase';
import { InputWithLabel } from './InputWithLabel';
import { CategorySelector } from './CategorySelector';
import { Tag } from './Tag';
import { Checkbox } from '@material-ui/core';
import { ADD_BLOG } from '../../recoil/dialog';
import firebase, { auth, db } from '../utils/firebase';
import { Label, LabelText } from '../../styles/common';
import { useSetRecoilState } from 'recoil';
import { toastValue } from '../../recoil/root';

export const AddBlogDialog = () => {
  const { register, errors, handleSubmit, reset } = useForm<FormValues>();
  const [tag, setTag] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const user = auth.currentUser;
  const setToast = useSetRecoilState(toastValue);

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
      reset();
      //memo 送信したらボタン選択解除したい
      //(連続で追加する場合によくないので)
      const res = await db.collection('tags').get();
      res.docs.map((doc) => doc.ref.update({ isChecked: false }));
      setToast(['追加出来ました！']);
      setCategory(null);
      setTag([]);
      setIsPublic(false);
      reset();
    } catch (error) {
      setToast(['追加に失敗しました','error'])
    }
  };

  const inputList: InputType[] = [
    {
      name: 'title',
      label: 'Title*',
      error: errors.title,
      inputRef: register({
        required: '必須項目です',
        pattern: {
          value: /[^ |　]/,
          message: 'スペースのみの入力はできません。',
        },
      }),
    },
    {
      name: 'url',
      label: 'URL*',
      error: errors.url,
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
      multiline: true,
      rows: 5,
      error: errors.memo,
      inputRef: register({
        pattern: {
          value: /[^ |　]/,
          message: 'スペースのみの入力はできません。',
        },
      }),
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
        <LabelText>非公開</LabelText>
        <Checkbox
          color="primary"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </Label>
    </DialogBase>
  );
};

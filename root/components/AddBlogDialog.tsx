import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues, InputType } from '../../types';
import { Label, LabelText } from '../../styles/common';
//recoil
import { useSetRecoilState } from 'recoil';
import { ADD_BLOG } from '../../recoil/dialog';
import { toastState } from '../../recoil/root';
//component
import { DialogBase } from '../components/DialogBase';
import { Tag } from '../components/Tag';
import { InputWithLabel } from '../components/InputWithLabel';
import { CategorySelector } from './CategorySelector';
//utils
import firebase, { auth, db } from '../utils/firebase';
import { NORMAL_VALIDATION, REQUIRED_VALIDATION } from '../utils/validation';
//material
import { Checkbox } from '@material-ui/core';

export const AddBlogDialog = () => {
  const { register, errors, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const [tag, setTag] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const user = auth.currentUser;
  const setToast = useSetRecoilState(toastState);
  const [publicCategory, setPublicCategory] = useState('');

  const onSubmit = async (data: FormValues) => {
    try {
      await db.collection('blog').add({
        title: data.title,
        url: data.url,
        memo: data.memo,
        category: publicCategory ? publicCategory : 'その他',
        myCategory: '',
        tag,
        isPrivate,
        postedUser: user?.uid,
        postedAt: firebase.firestore.Timestamp.now(),
      });

      const res = await db.collection('tags').get();
      res.docs.map((doc) => doc.ref.update({ isChecked: false }));
      setToast(['追加出来ました！']);
      setPublicCategory('');
      setTag([]);
      setIsPrivate(false);
      reset();
    } catch (error) {
      console.log(error);
      setToast(['追加に失敗しました', 'error']);
    }
  };

  const inputList: InputType[] = [
    {
      name: 'title',
      label: 'Title*',
      error: errors.title,
      inputRef: register(REQUIRED_VALIDATION),
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
      <CategorySelector setPublicCategory={setPublicCategory} />
      <Tag tag={tag} setTag={setTag} />
      <Label>
        <label css="display: flex">
          <LabelText>非公開</LabelText>
          <Checkbox
            color="primary"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        </label>
      </Label>
    </DialogBase>
  );
};

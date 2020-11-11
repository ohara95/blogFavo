import React from 'react';
//material
import { useForm } from 'react-hook-form';
import { FormValues, InputType } from '../../types';
import { useRecoilState } from 'recoil';
import { addCategory, addTags } from '../../recoil/root';
import { useState } from 'react';
import { DialogBase } from './DialogBase';
import { InputWithLabel } from './InputWithLabel';
import { CategorySelector } from './CategorySelector';
import { Tag } from './Tag';
import { Checkbox, InputLabel } from '@material-ui/core';
import { ADD_BLOG } from '../../recoil/dialog';

export const AddBlogDialog = () => {
  const { register, errors, handleSubmit, reset } = useForm<FormValues>();
  const [tag, setTag] = useRecoilState(addTags);
  const [category, setCategory] = useRecoilState(addCategory);
  const [checked, setChecked] = useState(false);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // try {
    //   await db.collection('blog').add({
    //     title: data.title,
    //     url: data.url,
    //     memo: data.memo,
    //     category,
    //     tag,
    //     isPublic,
    //     postedUser: db.collection('users').doc(user?.uid),
    //       postedAt: firebase.firestore.Timestamp.now(),
    //       isFavo: false,
    //       laterRead: false,
    //   });
    //   reset();
    //   //memo 送信したらボタン選択解除したい
    //   //(連続で追加する場合によくないので)
    //   const res = await db.collection('tags').get();
    //   res.docs.map((doc) => doc.ref.update({ isChecked: false }));
    //   alert('追加出来ました！');
    // } catch (error) {
    //   console.log(error);
    // }
    setTag([]);
    setCategory('');
    setChecked(false);
    reset();
    // if (currentDisplay === 'category') {
    //   try {
    //     if (categoryList.find((db) => db.name === data.category)) {
    //       return alert('カテゴリー名が存在します');
    //     }
    //     await db.collection('categoryList').add({
    //       name: data.category,
    //       imageUrl,
    //       createdUser: db.collection('users').doc(user?.uid),
    //     });
    //     alert('追加出来ました！');
    //     reset();
    //     setImageUrl('');
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  const inputList: InputType[] = [
    {
      name: 'title',
      label: 'Title*',
      error: errors.title,
      inputRef: register({
        required: '必須項目です',
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
      <CategorySelector />
      <Tag />
      <InputLabel>
        非公開
        <Checkbox
          color="primary"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </InputLabel>
    </DialogBase>
  );
};

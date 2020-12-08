import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues, InputType, PriorityType } from '../../types';
//recoil
import { useSetRecoilState } from 'recoil';
import { ADD_BLOG } from '../../recoil/dialog';
import { toastState } from '../../recoil/root';
//component
import { DialogBase } from '../components/DialogBase';
import { Tag } from '../components/Tag';
import { InputWithLabel } from '../components/InputWithLabel';
import { CategorySelector } from './CategorySelector';
import { PrioritySelector } from './PrioritySelector';
import { PrivateCheck } from './PrivateCheck';
//utils
import firebase, { auth, db } from '../utils/firebase';
import { NORMAL_VALIDATION, REQUIRED_VALIDATION } from '../utils/validation';
//material

export const AddBlogDialog = () => {
  const { register, errors, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const user = auth.currentUser;
  const setToast = useSetRecoilState(toastState);
  const [tag, setTag] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [publicCategory, setPublicCategory] = useState('');
  const [priority, setPriority] = useState<PriorityType>(null);

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
        isDone: false,
        priority: priority ? parseInt(priority) : 2,
        favCount: 0,
      });

      const res = await db.collection('tags').get();
      res.docs.map((doc) => doc.ref.update({ isChecked: false }));
      setToast(['追加出来ました！']);
      setPublicCategory('');
      setTag([]);
      setIsPrivate(false);
      reset();
      setPriority('0');
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
      {user && (
        <label css="display: flex">
          <PrivateCheck {...{ isPrivate, setIsPrivate }} />
          <PrioritySelector {...{ priority, setPriority }} />
        </label>
      )}
    </DialogBase>
  );
};

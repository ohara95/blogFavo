import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { Category, FormValues, InputType } from '../../types';
import {
  CategorySelector,
  InputWithLabel,
  DialogBase,
  Tag,
} from '../components';
import { EDIT_BLOG, dialogData } from '../../recoil/dialog';
import { db } from '../utils/firebase';
import { Label, LabelText, FlexLabel } from '../../styles/common';
import { useFirebase } from '../utils/hooks';
//material
import { Checkbox } from '@material-ui/core';

export const EditBlogDialog = () => {
  const [dialog, setDialog] = useRecoilState(dialogData);
  const blog = useFirebase<FormValues>('blog');
  const targetBlog = blog.find((db) => db.id === dialog.editBlog.id);
  const [tag, setTag] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const { register, errors, handleSubmit } = useForm<FormValues>();
  // const { register, errors, handleSubmit } = useForm<FormValues>({
  //   defaultValues: {
  //     title: targetBlog?.title,
  //     url: targetBlog?.url,
  //     memo: targetBlog?.memo,
  //     isPublic: targetBlog?.isPublic,
  //   },
  // });

  useEffect(() => {
    if (targetBlog) setIsPublic(targetBlog.isPublic);
  }, [targetBlog]);

  const upDateValidation = async (data: FormValues) => {
    const dataDetail = ['title', 'url', 'memo'];
    try {
      await dataDetail.map((type) => {
        if (data[type as 'title' | 'url' | 'memo']) {
          db.collection('blog')
            .doc(dialog.editBlog.id)
            .update({
              [type]: data[type as 'title' | 'url' | 'memo'],
            });
        } else {
          return;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      upDateValidation(data);

      if (category) {
        await db.collection('blog').doc(dialog.editBlog.id).update({
          category: category?.name,
        });
      }
      await db.collection('blog').doc(dialog.editBlog.id).update({
        isPublic,
      });
      setDialog((prev) => ({
        ...prev,
        [EDIT_BLOG]: {
          isDisplay: false,
          id: '',
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const inputList: InputType[] = [
    {
      name: 'title',
      label: 'Title*',
      error: errors.title,
      placeholder: targetBlog?.title,
      inputRef: register({
        required: '必須項目です',
      }),
    },
    {
      name: 'url',
      label: 'URL*',
      error: errors.url,
      placeholder: targetBlog?.url,
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
      placeholder: targetBlog?.memo,
    },
  ];

  return (
    <DialogBase
      title="ブログ登録内容変更"
      handleSubmit={handleSubmit(onSubmit)}
      dialogKey={EDIT_BLOG}
      doneText="更新"
    >
      {inputList.map((props) => (
        <InputWithLabel key={props.name} {...props} />
      ))}
      <CategorySelector
        category={category}
        setCategory={setCategory}
        placeholder={targetBlog?.category}
      />
      <Tag
        tag={targetBlog?.tag}
        setTag={setTag}
        defaultValue={targetBlog?.tag}
      />
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

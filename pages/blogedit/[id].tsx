import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Category, FormValues, InputType } from '../../types';
import { Label, LabelText, FlexLabel } from '../../styles/common';
import { db } from '../../root/utils/firebase';
import { useFirebase } from '../../root/utils/hooks';
import { CategorySelector } from '../../root/components/CategorySelector';
import { InputWithLabel } from '../../root/components/InputWithLabel';
import { Tag } from '../../root/components/Tag';
import { EditBase } from '../../root/components/EditBase';

//material
import { Checkbox } from '@material-ui/core';

const EditBlog = () => {
  const router = useRouter();
  const { id } = router.query;

  const blog = useFirebase<FormValues>('blog');
  const categoryList = useFirebase<Category>('categoryList');
  const [tag, setTag] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [targetBlog, setTargetBlog] = useState<FormValues>();
  const { register, errors, handleSubmit, control, reset } = useForm<
    FormValues
  >({
    mode: 'onBlur',
  });
  const targetCategory =
    blog && categoryList
      ? categoryList.find(
          (category) => category.name === blog.find((db) => db)?.category
        )
      : null;

  // -----useEffect[start]-----
  useEffect(() => {
    if (blog) {
      setTargetBlog(blog.find((db) => db.id === id));
    }
  }, [blog]);

  useEffect(() => {
    if (targetBlog) {
      reset({
        title: targetBlog?.title,
        url: targetBlog?.url,
        memo: targetBlog?.memo,
      });
    }
  }, [targetBlog, reset]);

  useEffect(() => {
    if (targetBlog) {
      setIsPublic(targetBlog.isPublic);
      setTag(targetBlog.tag);
    }
  }, [targetBlog]);

  useEffect(() => {
    if (targetCategory) {
      setCategory(targetCategory);
    }
  }, [targetCategory]);
  // ------useEffect[end]------

  const upDateValidation = async (data: FormValues) => {
    const dataDetail = ['title', 'url', 'memo'];
    try {
      await dataDetail.map((type) => {
        if (data[type as 'title' | 'url' | 'memo']) {
          if (typeof id === 'string') {
            db.collection('blog')
              .doc(id)
              .update({
                [type]: data[type as 'title' | 'url' | 'memo'],
              });
          }
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
        if (typeof id === 'string') {
          await db.collection('blog').doc(id).update({
            category: category?.name,
          });
        }
      }
      if (typeof id === 'string') {
        await db.collection('blog').doc(id).update({
          isPublic,
        });
      }
      router.back();
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
    <EditBase handleSubmit={handleSubmit(onSubmit)} title="ブログ編集">
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
    </EditBase>
  );
};

export default EditBlog;

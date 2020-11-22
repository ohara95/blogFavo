import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Category, FormValues, InputType } from '../../types';
import { Label, LabelText } from '../../styles/common';
import { db } from '../../root/utils/firebase';
import { useFirebase } from '../../root/utils/hooks';
import { CategorySelector } from '../../root/components/CategorySelector';
import { InputWithLabel } from '../../root/components/InputWithLabel';
import { Tag } from '../../root/components/Tag';
import { EditBase } from '../../root/components/EditBase';

//material
import { Checkbox } from '@material-ui/core';
import { NORMAL_VALIDATION, URL_VALIDATION } from '../../root/utils/validation';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../recoil/root';

const EditBlog = () => {
  const router = useRouter();
  const { id } = router.query;

  const blog = useFirebase<FormValues>('blog');
  const categoryList = useFirebase<Category>('categoryList');
  const [tag, setTag] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [targetBlog, setTargetBlog] = useState<FormValues>();
  const { register, errors, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const targetCategory =
    blog &&
    categoryList &&
    categoryList.find((category) =>
      blog.find((db) => db.category === category.name)
    );
  const setToast = useSetRecoilState(toastState);

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

  const upDateValidation = (data: FormValues) => {
    const dataDetail = ['title', 'url', 'memo'] as const;
    try {
      dataDetail.map(async (type) => {
        if (data[type])
          if (typeof id === 'string')
            await db
              .collection('blog')
              .doc(id)
              .update({
                [type]: data[type],
              });
      });
    } catch {
      setToast(['失敗しました', 'error']);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      upDateValidation(data);

      if (typeof id === 'string') {
        if (category)
          await db.collection('blog').doc(id).update({
            category: category?.name,
          });
        await db.collection('blog').doc(id).update({
          isPublic,
        });
      }
      router.back();
    } catch {
      setToast(['失敗しました', 'error']);
    }
  };

  const inputList: InputType[] = [
    {
      name: 'title',
      label: 'Title*',
      error: errors.title,
      inputRef: register(NORMAL_VALIDATION),
    },
    {
      name: 'url',
      label: 'URL*',
      error: errors.url,
      inputRef: register(URL_VALIDATION),
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
    <EditBase handleSubmit={handleSubmit(onSubmit)} title="ブログ編集">
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
    </EditBase>
  );
};

export default EditBlog;

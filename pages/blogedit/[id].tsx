import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../recoil/root';
import { Category, FormValues, InputType, PriorityType } from '../../types';
//component
import { CategorySelector } from '../../root/components/CategorySelector';
import { InputWithLabel } from '../../root/components/InputWithLabel';
import { Tag } from '../../root/components/Tag';
import { EditBase } from '../../root/components/EditBase';
import { PrioritySelector } from '../../root/components/PrioritySelector';
import { PrivateCheck } from '../../root/components/PrivateCheck';
//utils
import { db } from '../../root/utils/firebase';
import { useCollection } from '../../root/utils/hooks';
import { NORMAL_VALIDATION, URL_VALIDATION } from '../../root/utils/validation';

const EditBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, errors, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const blog = useCollection<FormValues>('blog');
  const categoryList = useCollection<Category>('categoryList');
  const [tag, setTag] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [publicCategory, setPublicCategory] = useState('');
  const [priority, setPriority] = useState<PriorityType>(null);
  const setToast = useSetRecoilState(toastState);

  const targetBlog = blog.find((db) => db.id === id);
  const targetCategory = categoryList.find((category) =>
    blog.find((db) => db.category === category.name)
  );

  // -----useEffect[start]-----
  useEffect(() => {
    if (targetBlog) {
      const { title, url, memo, category } = targetBlog;
      reset({ title, url, memo });
      setPublicCategory(category);
    }
  }, [targetBlog, reset]);

  useEffect(() => {
    if (targetBlog) {
      setIsPrivate(targetBlog.isPrivate);
      setTag(targetBlog.tag);
      setPriority(targetBlog.priority);
    }
  }, [targetBlog]);

  useEffect(() => {
    if (targetCategory) setCategory(targetCategory);
  }, [targetCategory]);

  // ------useEffect[end]------

  const upDateValidation = (data: FormValues) => {
    const dataDetail = ['title', 'url', 'memo'] as const;
    try {
      dataDetail.forEach(async (type) => {
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
        if (category) {
          await db.collection('blog').doc(id).update({
            category: publicCategory,
          });
        }
        await db.collection('blog').doc(id).update({
          isPrivate,
          priority,
        });
      }
      setToast(['変更出来ました！']);
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
      <CategorySelector
        setPublicCategory={setPublicCategory}
        publicCategory={publicCategory}
      />
      <Tag tag={tag} setTag={setTag} />
      <label css="display: flex">
        <PrivateCheck {...{ isPrivate, setIsPrivate }} />
        <PrioritySelector {...{ priority, setPriority }} />
      </label>
    </EditBase>
  );
};

export default EditBlog;

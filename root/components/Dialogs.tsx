import React from 'react';
import { useRecoilValue } from 'recoil';
import { dialogData } from '../../recoil/dialog';
import {
  AddBlogDialog,
  AddCategoryDialog,
  EditBlogDialog,
  EditCategoryDialog,
} from '../components';

export const Dialogs = () => {
  const dialog = useRecoilValue(dialogData);
  return (
    <>
      {dialog.addBlog && <AddBlogDialog />}
      {dialog.addCategory && <AddCategoryDialog />}
      {dialog.editBlog.isDisplay && <EditBlogDialog />}
      {dialog.editCategory.isDisplay && <EditCategoryDialog />}
    </>
  );
};

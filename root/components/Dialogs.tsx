import React from 'react';
import { useRecoilValue } from 'recoil';
import { dialogData } from '../../recoil/dialog';
import { AddBlogDialog } from './AddBlogDialog';
import { AddCategoryDialog } from './AddCategoryDialog';

export const Dialogs = () => {
  const dialog = useRecoilValue(dialogData);
  return (
    <>
      {dialog.addBlog && <AddBlogDialog />}
      {dialog.addCategory && <AddCategoryDialog />}
    </>
  );
};

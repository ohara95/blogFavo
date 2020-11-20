import React from 'react';
import { useRecoilValue } from 'recoil';
import { dialogData } from '../../recoil/dialog';
import { deleteConfig } from '../../recoil/configDialog';
import { AddBlogDialog } from './AddBlogDialog';
import { AddCategoryDialog } from './AddCategoryDialog';
import { RecommendRegisterDialog } from './RecommendRegisterDialog';
import { ConfirmDialog } from './ConfirmDialog';

export const Dialogs = () => {
  const dialog = useRecoilValue(dialogData);
  const deleteDialog = useRecoilValue(deleteConfig);
  return (
    <>
      {dialog.addBlog && <AddBlogDialog />}
      {dialog.addCategory && <AddCategoryDialog />}
      {dialog.recommendRegister && <RecommendRegisterDialog />}
      {deleteDialog.isDisplay && (
        <ConfirmDialog text="本当に削除してよろしいですか？" doneText="削除" />
      )}
    </>
  );
};

import React from 'react';
import { useRecoilValue } from 'recoil';
import { ADD_BLOG, openDialog } from '../../recoil/dialog';
import { AddBlogDialog } from './AddBlogDialog';

export const Dialogs = () => {
  const open = useRecoilValue(openDialog);
  return <>{open === ADD_BLOG && <AddBlogDialog />}</>;
};

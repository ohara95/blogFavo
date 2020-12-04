import { atom } from 'recoil';

export const currentDisplayData = atom<
  'list' | 'category' | 'yet' | 'done' | 'userCategoryBlog' | 'myCategoryBlog'
>({
  key: 'currentDisplayData',
  default: 'list',
});

export const activeDisplayData = atom<'my' | 'user'>({
  key: 'activeDisplayData',
  default: 'user',
});

export type ToastType = [string, ('error' | 'info' | 'success' | 'warning')?];

export const toastState = atom<ToastType>({
  key: 'toastState',
  default: [''],
});

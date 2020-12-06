import { atom } from 'recoil';

type CurrentDisplay =
  | 'list'
  | 'category'
  | 'yet'
  | 'done'
  | 'userCategoryBlog'
  | 'myCategoryBlog';

export const currentDisplayData = atom<CurrentDisplay>({
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

export const searchData = atom({
  key: 'searchData',
  default: '',
});

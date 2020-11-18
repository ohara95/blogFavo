import { atom } from 'recoil';

export const currentDisplayData = atom<'list' | 'category'>({
  key: 'currentDisplayData',
  default: 'list',
});

export const activeDisplayData = atom<'my' | 'user'>({
  key: 'activeDisplayData',
  default: 'user',
});

export type ToastType = [string, ('error' | 'info' | 'success' | 'warning')?];

export const toastValue = atom<ToastType>({
  key: 'toastValue',
  default: [''],
});

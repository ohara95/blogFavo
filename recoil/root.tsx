import { atom } from 'recoil';

export const addTags = atom<string[]>({
  key: 'addTags',
  default: [],
});

export const addCategory = atom<string>({
  key: 'addCategory',
  default: '',
});

export const currentDisplayData = atom({
  key: 'currentDisplayData',
  default: 'list',
});

export const imageData = atom({
  key: 'imageData',
  default: '',
});

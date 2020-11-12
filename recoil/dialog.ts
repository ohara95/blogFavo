import { atom } from 'recoil';

export const ADD_BLOG = 'addBlog';
export const ADD_CATEGORY = 'addCategory';

export type DialogState = {
  addBlog: boolean;
  addCategory: boolean;
};

export const dialogData = atom<DialogState>({
  key: 'dialogData',
  default: {
    [ADD_BLOG]: false,
    [ADD_CATEGORY]: false,
  },
});

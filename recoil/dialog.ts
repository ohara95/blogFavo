import { atom } from 'recoil';

export const ADD_BLOG = 'addBlog';

export type DialogState = {
  addBlog: boolean;
};

export const dialogData = atom<DialogState>({
  key: 'dialogData',
  default: {
    [ADD_BLOG]: false,
  },
});
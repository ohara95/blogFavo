import { atom } from 'recoil';

export const ADD_BLOG = 'addBlog';
export const ADD_CATEGORY = 'addCategory';
export const RECOMMEND_REGISTER = 'recommendRegister';

export type DialogState = {
  addBlog: boolean;
  addCategory: boolean;
  recommendRegister: boolean;
};

export const dialogData = atom<DialogState>({
  key: 'dialogData',
  default: {
    [ADD_BLOG]: false,
    [ADD_CATEGORY]: false,
    [RECOMMEND_REGISTER]: false,
  },
});

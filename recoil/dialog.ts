import { atom } from 'recoil';
import { FormValues } from '../types';

export const ADD_BLOG = 'addBlog';
export const ADD_CATEGORY = 'addCategory';
export const EDIT_BLOG = 'editBlog';
export const EDIT_CATEGORY = 'editCategory';

export type DialogState = {
  addBlog: boolean;
  addCategory: boolean;
  editBlog: {
    isDisplay: boolean;
    id: string | undefined;
    // targetData: FormValues[];
  };
  editCategory: {
    isDisplay: boolean;
    id: string | undefined;
    // targetData: FormValues[];
  };
};

export const dialogData = atom<DialogState>({
  key: 'dialogData',
  default: {
    [ADD_BLOG]: false,
    [ADD_CATEGORY]: false,
    [EDIT_BLOG]: {
      isDisplay: false,
      id: '',
      // targetData: [],
    },
    [EDIT_CATEGORY]: {
      isDisplay: false,
      id: '',
      // targetData: [],
    },
  },
});

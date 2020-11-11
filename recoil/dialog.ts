import { atom } from "recoil";

export const ADD_BLOG = 'addBlog';

export const openDialog = atom({
    key: 'openDialog',
    default: '',
})
import firebase from './root/utils/firebase';

export type FormValues = {
  title: string;
  url: string;
  memo: string;
  category: string;
  myCategory: string;
  tag: string[];
  isPrivate: boolean;
  id: string;
  postedAt?: firebase.firestore.Timestamp;
  postedUser?: string;
  favCount: number;
  otherUserBlogId?: string;
  isDone: boolean;
  priority: '0' | '1' | '2' | '3' | null;
};

export type Tags = {
  name: string;
  id: string;
  isChecked: boolean;
};

export type Category = {
  name: string;
  id: string;
  imageUrl: string;
  inputValue?: string;
};

export type User = {
  name: string;
  imageUrl?: string;
  id: string;
};

export type InputType = {
  name: string;
  label: string;
  error?: any;
  type?: 'text' | 'email' | 'password';
  inputRef?: any;
  variant?: 'outlined';
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
};

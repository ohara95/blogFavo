import firebase from './root/utils/firebase';

export type FormValues = {
  title: string;
  url: string;
  memo: string;
  category: string;
  tag: string[];
  isPublic: boolean;
  id?: string;
  postedAt?: firebase.firestore.Timestamp;
  postedUser?: string;
  isFavo?: boolean;
  laterRead: boolean;
};

export type Tags = {
  name: string;
  id: string;
  isChecked: boolean;
};

export type Category = {
  name: string;
  id?: string;
  inputValue?: string;
  imageUrl?: string;
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
  control?: any;
  type?: 'text' | 'email' | 'password';
  inputRef?: any;
  variant?: 'outlined';
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
};

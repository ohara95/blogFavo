export type FormValues = {
  title: string;
  url: string;
  memo: string;
  category: string;
  tag: string[];
  isPublic: boolean;
  id?: string;
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
  url?: string;
};

export type InputType = {
  name: string;
  label: string;
  error?: any;
  type?: 'text' | 'email' | 'password';
  inputRef?: any;
  variant?: 'outlined'
  multiline?: boolean;
  rows?: number;
}
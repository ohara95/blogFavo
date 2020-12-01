export const EMAIL_VALIDATION = {
  required: 'メールアドレスを入力してください',
  pattern: {
    value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
    message: 'メールアドレスの形式が不正です',
  },
};

export const NORMAL_VALIDATION = {
  pattern: {
    value: /[^ |　]/,
    message: 'スペースのみの入力はできません。',
  },
};
export const REQUIRED_VALIDATION = {
  required: '必須項目です',
  pattern: {
    value: /[^ |　]/,
    message: 'スペースのみの入力はできません。',
  },
};

export const URL_VALIDATION = {
  required: '必須項目です',
  pattern: {
    value: /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g,
    message: '正しい書式で入力してください',
  },
};

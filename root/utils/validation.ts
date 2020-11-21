export const EMAIL_VALIDATION = {
  required: 'メールアドレスを入力してください',
  pattern: {
    value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
    message: 'メールアドレスの形式が不正です',
  },
};

export const NORMAL_VALIDATION = {
  required: '必須項目です',
  pattern: {
    value: /[^ |　]/,
    message: 'スペースのみの入力はできません。',
  },
};

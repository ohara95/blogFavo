import { atom } from 'recoil';

export const deleteConfig = atom({
  key: 'deleteConfig',
  default: {
    id: '',
    isDone: false,
    isDisplay: false,
    type: '',
  },
});

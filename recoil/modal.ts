import { atom } from 'recoil';

export const ADD_FORM = 'addForm';

type ModalState = {
  is_open: boolean;
  addForm: boolean;
};

export const openModal = atom<ModalState>({
  key: 'openModal',
  default: {
    is_open: false,
    [ADD_FORM]: false,
  },
});

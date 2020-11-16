import { atom } from 'recoil';

export const currentDisplayData = atom<'list' | 'category'>({
  key: 'currentDisplayData',
  default: 'list',
});

export const activeDisplayData = atom<'my' | 'user'>({
  key: 'activeDisplayData',
  default: 'user',
});

// export const imageData = atom({
//   key: 'imageData',
//   default: '',
// });

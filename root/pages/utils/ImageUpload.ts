import { storage } from './firebase';
import { nanoid } from 'nanoid';

export const ImageUpload = (file: File, set: (param: string) => void) => {
  storage
    .ref()
    .child(nanoid())
    .put(file)
    .then(async (snap) => {
      const url = await snap.ref.getDownloadURL();
      set(url);
    });
};

import React, { FC, useState } from 'react';
import { Category } from '../../types';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../recoil/root';
import { db, auth } from '../utils/firebase';
import { useCollection } from '../utils/hooks/useCollection';
import { DialogHeader, StyledDialog, StyledDialogContent } from './DialogBase';
import { Button, DialogActions, DialogTitle } from '@material-ui/core';

type Props = {
  id: string | undefined;
  type: 'blog' | 'myCategory';
};

export const DeleteButton: FC<Props> = ({ id, type }) => {
  const [open, setOpen] = useState(false);
  const setToast = useSetRecoilState(toastState);
  const user = auth.currentUser;
  const myCategory = useCollection<Category>(`users/${user?.uid}/myCategory`);

  const deleteItem = async () => {
    try {
      const res = await db.doc(`${type}/${id}`).get();
      const otherUserBlogId: string = res.data()?.otherUserBlogId;
      db.doc(`blog/${otherUserBlogId}/laterReadUsers/${user?.uid}`).delete();

      await db.collection(type).doc(id).delete();

      if (type === 'myCategory') {
        await db.doc(`users/${user?.uid}/myCategory/${id}`).delete();
        const res = await db.collection('blog').get();
        res.forEach((doc) => {
          if (
            doc.data().myCategory ===
            myCategory.find((category) => category.id === id)?.name
          ) {
            doc.ref.update({ myCategory: '' });
          }
        });
        setToast(['削除しました']);
      }
    } catch {
      setToast(['削除に失敗しました', 'error']);
    }
  };

  return (
    <>
      <Button size="small" color="secondary" onClick={() => setOpen(true)}>
        delete
      </Button>
      <StyledDialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>削除確認</DialogTitle>
        </DialogHeader>
        <StyledDialogContent>本当に削除しますか?</StyledDialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            キャンセル
          </Button>
          <Button color="secondary" onClick={deleteItem}>
            削除
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

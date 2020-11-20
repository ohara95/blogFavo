import { Button, DialogActions, DialogTitle } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastValue } from '../../recoil/root';
import { db } from '../utils/firebase';
import { DialogHeader, StyledDialog, StyledDialogContent } from './DialogBase';

type Props = {
  id: string | undefined;
  type: 'blog' | 'categoryList';
};

export const DeleteButton: FC<Props> = ({ id, type }) => {
  const [open, setOpen] = useState(false);
  const setToast = useSetRecoilState(toastValue);

  const deleteItem = async () => {
    try {
      await db.collection(type).doc(id).delete();
      if (type === 'categoryList') {
        const res = await db.collection('blog').get();
        res.docs.forEach((doc) => {
          if (doc.data().category.id === id)
            doc.ref.update({
              category: {
                name: '',
                id: '',
              },
            });
          setToast(['削除しました']);
        });
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
        <StyledDialogContent>本当に削除しますか? </StyledDialogContent>
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

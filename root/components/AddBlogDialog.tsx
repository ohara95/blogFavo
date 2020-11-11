import React, { FC } from 'react';
//material
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addCategory, addTags } from '../../recoil/root';
import { useState } from 'react';

type Props = {
  onClickClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: boolean;
  title: string;
  render: FC<{ register: any; errors: any; control?: any }>;
};

export const AddDialog: FC<Props> = ({
  title,
  open,
  onClickClose,
  render: Render,
}) => {
  const { control, register, errors, handleSubmit, reset } = useForm<
    FormValues
  >();
  const [tag, setTag] = useRecoilState(addTags);
  const [category, setCategory] = useRecoilState(addCategory);
  const [checked,setChecked] = useState()

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // try {
    //   await db.collection('blog').add({
    //     title: data.title,
    //     url: data.url,
    //     memo: data.memo,
    //     category,
    //     tag,
    //     isPublic,
    //   });
    //   reset();
    //   //memo 送信したらボタン選択解除したい
    //   //(連続で追加する場合によくないので)
    //   const res = await db.collection('tags').get();
    //   res.docs.map((doc) => doc.ref.update({ isChecked: false }));
    //   alert('追加出来ました！');
    // } catch (error) {
    //   console.log(error);
    // }
    setTag([]);
    setCategory('');
    reset();
  };

  return (
    <Dialog open={open} onClose={onClickClose}>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {control ? (
            <Render {...{ register, errors, control }} />
          ) : (
            <Render {...{ register, errors }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose} color="primary">
            キャンセル
          </Button>
          <Button type="submit" color="primary" autoFocus>
            追加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

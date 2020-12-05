import React, { FC } from 'react';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/dist/client/router';
import { toastState } from '../../recoil/root';
import { useSetRecoilState } from 'recoil';
//material
import { Menu, MenuItem } from '@material-ui/core';

type Props = {
  open: null | HTMLElement;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

export const SettingMenu: FC<Props> = ({ open, onClose }) => {
  const router = useRouter();
  const user = auth.currentUser;
  const setToast = useSetRecoilState(toastState);

  const handleAction = async () => {
    if (user) {
      try {
        await auth.signOut();
      } catch {
        setToast(['サインアウトに失敗しました']);
      }
    } else {
      router.push('/signin');
    }
  };

  return (
    <Menu
      id="simple-menu"
      keepMounted
      anchorEl={open}
      open={!!open}
      onClose={onClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>setting</MenuItem>
      <MenuItem onClick={handleAction}>{user ? 'Logout' : 'signin'}</MenuItem>
    </Menu>
  );
};

import React, { FC } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/dist/client/router';

type Props = {
  open: null | HTMLElement;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

export const SettingMenu: FC<Props> = ({ open, onClose }) => {
  const router = useRouter();
  const user = auth.currentUser;
  const handleAction = async () => {
    if (user) {
      try {
        await auth.signOut();
      } catch {
        alert('サインアウトに失敗しました');
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
      open={Boolean(open)}
      onClose={onClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>setting</MenuItem>
      <MenuItem onClick={handleAction}>{user ? 'Logout' : 'signin'}</MenuItem>
    </Menu>
  );
};

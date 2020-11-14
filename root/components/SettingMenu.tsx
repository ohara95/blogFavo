import React, { FC } from 'react';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/dist/client/router';
//material
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { toastValue } from '../../recoil/root';
import { useSetRecoilState } from 'recoil';

type Props = {
  open: null | HTMLElement;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

export const SettingMenu: FC<Props> = ({ open, onClose }) => {
  const router = useRouter();
  const user = auth.currentUser;
  const setToast = useSetRecoilState(toastValue);

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
      open={Boolean(open)}
      onClose={onClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>setting</MenuItem>
      <MenuItem onClick={handleAction}>{user ? 'Logout' : 'signin'}</MenuItem>
    </Menu>
  );
};

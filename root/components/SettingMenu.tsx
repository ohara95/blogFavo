import React, { FC } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  open: null | HTMLElement;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

export const SettingMenu: FC<Props> = ({ open, onClose }) => (
  <Menu
    id="simple-menu"
    keepMounted
    anchorEl={open}
    open={Boolean(open)}
    onClose={onClose}
  >
    <MenuItem>Profile</MenuItem>
    <MenuItem>setting</MenuItem>
    <MenuItem>Logout</MenuItem>
  </Menu>
);

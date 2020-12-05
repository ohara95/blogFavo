import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { activeDisplayData } from '../../recoil/root';
import { SettingMenu } from '../components/SettingMenu';

//material
import {
  Toolbar,
  AppBar,
  CssBaseline,
  IconButton,
  Tooltip,
  Grid,
  Typography,
} from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
//icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FaceIcon from '@material-ui/icons/Face';
import { auth } from '../utils/firebase';
import { useSetRecoilState } from 'recoil';
import { dialogData, RECOMMEND_REGISTER } from '../../recoil/dialog';

const useStyles = makeStyles(() => ({
  icon: {
    color: 'white',
  },
  themeColor: {
    backgroundColor: cyan[700],
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = useRecoilState(activeDisplayData);
  const user = auth.currentUser;
  const setDialog = useSetRecoilState(dialogData);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(e.currentTarget);
  };
  const handleClose = () => setOpen(null);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.themeColor}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Tooltip title="my">
                <IconButton
                  aria-label="my"
                  onClick={() => {
                    user
                      ? setActivePage('my')
                      : setDialog((prev) => ({
                          ...prev,
                          [RECOMMEND_REGISTER]: true,
                        }));
                  }}
                >
                  <FaceIcon className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip title="users">
                <IconButton
                  aria-label="users"
                  onClick={() => {
                    setActivePage('user');
                  }}
                >
                  <SupervisorAccountIcon className={classes.icon} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Typography>{activePage}</Typography>
            <Grid item>
              <Tooltip title="setting">
                <IconButton aria-label="setting" onClick={handleClick}>
                  <MoreVertIcon className={classes.icon} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <SettingMenu open={open} onClose={handleClose} />
    </>
  );
};

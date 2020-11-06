import React, { useState } from 'react';
import { SettingMenu } from '../components';

//material
import Toolbar from '@material-ui/core/Toolbar';
import { cyan } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
//icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FaceIcon from '@material-ui/icons/Face';

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
                <IconButton aria-label="my">
                  <FaceIcon className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip title="users">
                <IconButton aria-label="users">
                  <SupervisorAccountIcon className={classes.icon} />
                </IconButton>
              </Tooltip>
            </Grid>
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

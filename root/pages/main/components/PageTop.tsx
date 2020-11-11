import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { currentDisplayData } from '../../../../recoil/root';
//material
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },

  inputRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  themeColor: {
    backgroundColor: cyan[700],
    color: 'white',
  },
  currentColor: {
    backgroundColor: cyan[500],
  },
}));

type Props = {
  title: string;
};

export const PageTop: FC<Props> = ({ title }) => {
  const classes = useStyles();
  const [currentDisplay, setCurrentDisplay] = useRecoilState(
    currentDisplayData
  );

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {title}
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Paper component="form" className={classes.inputRoot}>
            <InputBase className={classes.input} placeholder="検索" />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                className={
                  currentDisplay === 'list'
                    ? classes.themeColor
                    : classes.currentColor
                }
                onClick={() => {
                  setCurrentDisplay('list');
                }}
              >
                list
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className={
                  currentDisplay === 'category'
                    ? classes.themeColor
                    : classes.currentColor
                }
                onClick={() => {
                  setCurrentDisplay('category');
                }}
              >
                category
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

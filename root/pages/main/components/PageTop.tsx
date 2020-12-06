import React, { FC } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentDisplayData,
  activeDisplayData,
  toastState,
  searchData,
} from '../../../../recoil/root';
//material
import {
  Button,
  Grid,
  Container,
  Paper,
  InputBase,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';

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
    border: '1px solid white',
    '&:hover': {
      backgroundColor: cyan[600],
    },
  },
}));

type Props = {
  title: string;
  categoryLength?: number;
  yetBlogLength?: number;
  doneBlogLength?: number;
};

export const PageTop: FC<Props> = ({
  title,
  categoryLength,
  yetBlogLength,
  doneBlogLength,
}) => {
  const classes = useStyles();
  const [currentDisplay, setCurrentDisplay] = useRecoilState(
    currentDisplayData
  );
  const [searchValue, setSearchValue] = useRecoilState(searchData);
  const activePage = useRecoilValue(activeDisplayData);
  const setToast = useSetRecoilState(toastState);

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
            <InputBase
              className={classes.input}
              placeholder="検索"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
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
                variant="outlined"
                onClick={() => {
                  setCurrentDisplay('list');
                }}
                className={currentDisplay === 'list' ? classes.themeColor : ''}
              >
                一覧
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  setCurrentDisplay('category');
                  if (!categoryLength && activePage === 'my')
                    setToast(['カテゴリーがありません', 'warning']);
                }}
                className={
                  currentDisplay === 'category' ? classes.themeColor : ''
                }
              >
                カテゴリー別
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center">
            {activePage === 'my' && (
              <>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCurrentDisplay('yet');
                      if (!yetBlogLength && activePage === 'my')
                        setToast(['未読ブログはありません', 'warning']);
                    }}
                    className={
                      currentDisplay === 'yet' ? classes.themeColor : ''
                    }
                  >
                    未読
                    <LocalLibraryRoundedIcon />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCurrentDisplay('done');
                      if (!doneBlogLength && activePage === 'my')
                        setToast(['読み終えたブログはありません', 'warning']);
                    }}
                    className={
                      currentDisplay === 'done' ? classes.themeColor : ''
                    }
                  >
                    読了
                    <CheckCircleOutlineRoundedIcon />
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

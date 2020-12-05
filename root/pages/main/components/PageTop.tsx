import React, { FC } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentDisplayData,
  activeDisplayData,
  toastState,
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
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import styled from 'styled-components';
import { COLOR } from '../../../../styles/color';

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
  const [currentDisplay, setCurrentDisplay] = useRecoilState(
    currentDisplayData
  );
  const activePage = useRecoilValue(activeDisplayData);
  const setToast = useSetRecoilState(toastState);

  const buttonList = [
    {
      text: '一覧',
      isThemeColor: currentDisplay === 'list',
      onClick: () => setCurrentDisplay('list'),
    },
    {
      text: 'カテゴリー別',
      isThemeColor: currentDisplay === 'category',
      onClick: () => {
        setCurrentDisplay('category');
        if (!categoryLength && activePage === 'my')
          setToast(['カテゴリーがありません', 'warning']);
      },
    },
    {
      text: '未読',
      isThemeColor: currentDisplay === 'yet',
      onClick: () => {
        setCurrentDisplay('yet');
        if (!yetBlogLength && activePage === 'my')
          setToast(['未読ブログはありません', 'warning']);
      },
      icon: <LocalLibraryRoundedIcon />,
    },
    {
      text: '読了',
      isThemeColor: currentDisplay === 'done',
      onClick: () => {
        setCurrentDisplay('done');
        if (!doneBlogLength && activePage === 'my')
          setToast(['読み終えたブログはありません', 'warning']);
      },
      icon: <CheckCircleOutlineRoundedIcon />,
    },
  ];

  return (
    <HeroContent>
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
          <InputRoot component="form">
            <StyledInput placeholder="検索" />
            <StyledIconButton type="submit" aria-label="search">
              <SearchIcon />
            </StyledIconButton>
          </InputRoot>
        </Grid>
        <HeroButtons>
          <Grid container spacing={2} justify="center">
            {buttonList.map(({ text, icon, ...otherProps }, i) => {
              if (activePage !== 'my' && i >= 2) return;
              return (
                <Grid item key={text}>
                  <StyledButton variant="outlined" {...otherProps}>
                    {text}
                    {icon}
                  </StyledButton>
                </Grid>
              );
            })}
          </Grid>
        </HeroButtons>
      </Container>
    </HeroContent>
  );
};

const HeroContent = styled.div`
  background-color: ${COLOR.WHITE};
  padding: 64px 0 48px;
`;

const HeroButtons = styled.div`
  margin-top: 32px;
`;

const InputRoot = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 400px;
`;

const StyledInput = styled(InputBase)`
  margin-left: 8px;
  flex: 1;
`;

const StyledIconButton = styled(IconButton)`
  padding: 10px;
`;

const StyledButton = styled(Button)<{ isThemeColor: boolean }>`
  ${({ isThemeColor }) =>
    isThemeColor &&
    `
    background-color: ${COLOR.MAIN};
    color: ${COLOR.WHITE};
    border: 1px solid ${COLOR.WHITE};
    :hover {
      background-color: ${COLOR.MAIN_HOVER};
    }
  `}
`;

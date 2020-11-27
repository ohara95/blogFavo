import React, { FC } from 'react';
// material
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { dialogData } from '../../recoil/dialog';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { COLOR } from '../../styles/color';

type Props = {
  dialogKey: string;
};

export const AddButton: FC<Props> = ({ dialogKey }) => {
  const setDialog = useSetRecoilState(dialogData);

  const handleClickOpen = () => {
    setDialog((prev) => ({
      ...prev,
      [dialogKey]: true,
    }));
  };

  return (
    <IconButton onClick={handleClickOpen}>
      <StyledFab>
        <AddIcon />
      </StyledFab>
    </IconButton>
  );
};

const StyledFab = styled(Fab)`
  position: fixed;
  right: 10px;
  bottom: 10px;
  background-color: ${COLOR.MAIN};
  color: ${COLOR.WHITE};
  &:hover {
    background-color: ${COLOR.MAIN_HOVER};
  }
`;

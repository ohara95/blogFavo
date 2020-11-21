import { TextField } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { COLOR } from './color';
import { sp } from './media';

export const SPACE_BETWEEN = css`
  display: flex;
  justify-content: space-between;
`;

export const ALIGN_ITEMS_CENTER = css`
  display: flex;
  align-items: center;
`;

export const InputError = styled.p`
  margin-top: 5px;
  color: ${COLOR.RED};
`;

export const Label = styled.label`
  padding: 12px;
  display: block;
`;

export const LabelText = styled.p`
  opacity: 0.6;
  font-weight: 400;
  font-size: 16px;
  margin: 8px;
`;

export const BaseTextField = styled(TextField)`
  padding: 10px;
  width: 95%;
`;

export const AuthenticateContainer = styled.div`
  margin: 50px auto;
  ${ALIGN_ITEMS_CENTER}
  flex-direction: column;
  width: 400px;
  > form {
    width: 100%;
    margin-top: 24px;
  }
  ${sp`
    width: 250px;
  `}
`;

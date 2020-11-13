import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { COLOR } from './color';
import { sp } from './media';

export const AuthenticateContainer = styled.div`
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  ${sp`
    width: 250px;
  `}
`;

export const StyledButton = styled(Button)<{ loading?: boolean }>`
  margin: 24px 0 16px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.TURQUOISE};
  box-shadow: ${COLOR.BLACK} 0px 1px 3px;
  height: 36px;
  &:hover {
    background-color: ${COLOR.LIGHT_GRAY};
    box-shadow: none;
  }
  ${({ loading }) => loading && { backgroundColor: COLOR.LIGHT_GRAY }}
`;

export const AuthenticateForm = styled.form`
  width: 100%;
  margin-top: 24px;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
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
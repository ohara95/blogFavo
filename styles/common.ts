import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { COLOR } from './color';

export const AuthenticateContainer = styled.div`
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
`;

export const StyledButton = styled(Button)`
  margin: 24px 0 16px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.TURQUOISE};
  box-shadow: ${COLOR.BLACK} 0px 1px 3px;
  &:hover {
    background-color: ${COLOR.LIGHT_GRAY};
    box-shadow: none;
  }
`;

export const AuthenticateForm = styled.form`
  width: 100%;
  margin-top: 24px;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.label`
  margin-top: 20px;
  display: block;
`;

export const InputError = styled.p`
  margin-top: 5px;
  color: ${COLOR.RED};
`;
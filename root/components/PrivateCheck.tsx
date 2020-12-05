import React, { FC } from 'react';
import { Checkbox } from '@material-ui/core';
import { Label, LabelText } from '../../styles/common';

type Props = {
  isPrivate: boolean;
  setIsPrivate: (param: boolean) => void;
};

export const PrivateCheck: FC<Props> = ({ isPrivate, setIsPrivate }) => (
  <Label>
    <label css="display: flex">
      <LabelText>非公開</LabelText>
      <Checkbox
        color="primary"
        checked={isPrivate}
        onChange={(e) => setIsPrivate(e.target.checked)}
      />
    </label>
  </Label>
);

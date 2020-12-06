import React, { FC } from 'react';
import { PriorityType } from '../../types';
import { Label, LabelText } from '../../styles/common';
import { FormControl, Select } from '@material-ui/core';

type Props = {
  priority: PriorityType;
  setPriority: (param: PriorityType) => void;
};

export const PrioritySelector: FC<Props> = ({ priority, setPriority }) => (
  <Label>
    <FormControl>
      <label css="display: flex">
        <LabelText>優先度</LabelText>
        <Select
          native
          onChange={(e) => {
            setPriority(e.target.value as PriorityType);
          }}
          value={priority}
        >
          <option value={0}>選択してください</option>
          <option value={1}>低</option>
          <option value={2}>普通</option>
          <option value={3}>高</option>
        </Select>
      </label>
    </FormControl>
  </Label>
);

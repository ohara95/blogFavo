import React, { FC } from 'react';
import { Label, LabelText } from '../../styles/common';
import { FormControl, Select } from '@material-ui/core';

type Props = {
  priority: '0' | '1' | '2' | '3' | null;
  setPriority: (param: '0' | '1' | '2' | '3' | null) => void;
};

export const PrioritySelector: FC<Props> = ({ priority, setPriority }) => {
  return (
    <Label>
      <FormControl>
        <label css="display: flex">
          <LabelText>優先度</LabelText>
          <Select
            native
            onChange={(e) => {
              setPriority(e.target.value as '0' | '1' | '2' | '3');
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
};

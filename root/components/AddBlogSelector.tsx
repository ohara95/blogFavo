import React, { FC } from 'react';
import { FormValues } from '../../types';
import { Label, LabelText, BaseTextField } from '../../styles/common';
import styled from 'styled-components';
//material
import Autocomplete from '@material-ui/lab/Autocomplete';

type Props = {
  setBlog: (param: FormValues[]) => void;
  options: FormValues[];
};

export const AddBlogSelector: FC<Props> = ({ setBlog, options }) => {
  return (
    <Label>
      <LabelText>追加ブログ選択</LabelText>
      <StyledAutocomplete
        multiple
        onChange={(_, el) => {
          setBlog(el as FormValues[]);
        }}
        options={options}
        getOptionLabel={(option) => (option as FormValues).title}
        renderInput={(params) => (
          <BaseTextField
            {...params}
            variant="standard"
            placeholder="選択してください"
          />
        )}
      />
    </Label>
  );
};

const StyledAutocomplete = styled(Autocomplete)`
  .MuiFormControl-root {
    flex-direction: row;
  }
`;

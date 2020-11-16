import React, { useEffect, FC, useState } from 'react';
import { db } from '../utils/firebase';
import { Tags } from '../../types';
import { useFirebase } from '../utils/hooks';
//material
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { Label, LabelText } from '../../styles/common';
import styled from 'styled-components';
import { COLOR } from '../../styles/color';

type Props = {
  tag: string[] | undefined;
  setTag: (tag: string[]) => void;
  defaultValue?: any;
};

export const Tag: FC<Props> = ({ tag, setTag, defaultValue }) => {
  const tags = useFirebase<Tags>('tags');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (tag) {
      tag
        .filter((el) => !tag.includes(el))
        .map((tag) => {
          db.collection('tags').add({
            name: tag,
          });
        });
    }
  }, [tag]);

  return (
    <Label>
      <LabelText>Tag</LabelText>
      <StyledAutocomplete
        onChange={(...el) => {
          setTag(el[1] as string[]);
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          //入力した値
          setInputValue(newInputValue);
        }}
        multiple
        options={tags
          .filter((option) => !tag?.includes(option.name))
          .map((option) => option.name)}
        freeSolo
        renderTags={(_, getTagProps) =>
          tag?.map((option: string, index: number) => {
            return <StyledChip label={option} {...getTagProps({ index })} />;
          })
        }
        renderInput={(params) => {
          return (
            <StyledTextField
              {...params}
              variant="standard"
              placeholder="追加してください"
            />
          );
        }}
        defaultValue={defaultValue}
      />
    </Label>
  );
};

const StyledAutocomplete = styled(Autocomplete)`
  .MuiFormControl-root {
    flex-direction: row;
  }
`;

const StyledTextField = styled(TextField)`
  height: 40px;
  padding: 0 10px;
`;

const StyledChip = styled(Chip)`
  background-color: ${COLOR.TURQUOISE};
`;

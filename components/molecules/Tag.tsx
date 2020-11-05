import React, { useState } from 'react';
import { Tags } from '../../types';
import useFirebase from '../../hooks/useFirebase';
//material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    padding: {
      padding: theme.spacing(1),
    },
    backGround: {
      backgroundColor: cyan[700],
      color: 'white',
      marginBottom: theme.spacing(1),
    },
    field: {
      padding: theme.spacing(1),
      border: 'none',
    },
  })
);

const TagTest = () => {
  const classes = useStyles();
  const [tags] = useFirebase<Tags>('tags');
  const [inputValue, setInputValue] = useState('');
  const [selectTags, setSelectTags] = useState<string[]>([]);

  return (
    <>
      <InputLabel className={classes.margin}>Tag</InputLabel>
      <Autocomplete
        onChange={(...el) => {
          setSelectTags(el[1]);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          //入力した値
          setInputValue(newInputValue);
        }}
        multiple
        options={tags.map((option) => option.name)}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              className={classes.backGround}
            />
          ))
        }
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                variant="standard"
                className={classes.padding}
                placeholder="追加してください"
              />
            </>
          );
        }}
      />
    </>
  );
};

export default TagTest;

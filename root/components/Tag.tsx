import React, { useEffect, FC } from 'react';
import { db } from '../utils/firebase';
import { Tags } from '../../types';
import { useFirebase } from '../utils/hooks';
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
      '&:hover': {
        backgroundColor: cyan[500],
      },
    },
    field: {
      padding: theme.spacing(1),
      border: 'none',
    },
  })
);

type Props = {
  tag: string[];
  setTag: (tag: string[]) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
};

export const Tag: FC<Props> = ({ tag, setTag, inputValue, setInputValue }) => {
  const classes = useStyles();
  const [tags] = useFirebase<Tags>('tags');

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
    <>
      <InputLabel className={classes.margin}>Tag</InputLabel>
      <Autocomplete
        onChange={(...el) => {
          setTag(el[1]);
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          //入力した値
          setInputValue(newInputValue);
        }}
        multiple
        options={tags
          .filter((option) => !tag.includes(option.name))
          .map((option) => option.name)}
        freeSolo
        className={classes.padding}
        renderTags={(value: string[], getTagProps) =>
          tag.map((option: string, index: number) => {
            console.log(option);
            return <Chip label={option} {...getTagProps({ index })} />;
          })
        }
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              placeholder="追加してください"
            />
          );
        }}
      />
    </>
  );
};

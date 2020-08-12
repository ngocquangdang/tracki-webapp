import React from 'react';
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputBase,
} from '@material-ui/core';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #1a1a1a',
      fontSize: 15,
      lineHeight: '18px',
      padding: '11px 26px 11px 10px',
      color: '#1a1a1a',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
      '&:focus': {
        borderRadius: 4,
        backgroundColor: '#fff',
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    height: 40,
    '& > div': {
      marginTop: 0,
    },
  },
  menuItem: {
    color: '#1a1a1a',
  },
}));

interface Props {
  id: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange(value: string): void;
}

export default function SelectTracker(props: Props) {
  const { id, value, options, onChange } = props;
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl className={classes.container}>
      <InputLabel id={id + '_input_label'}></InputLabel>
      <Select
        labelId={id + '_input_label'}
        id={id + '_select'}
        value={value}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        {options.map((opt, index) => (
          <MenuItem
            key={index}
            value={opt.value}
            className={classes.menuItem}
            onMouseDown={e => e.preventDefault()}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

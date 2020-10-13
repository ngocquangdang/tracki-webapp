import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';

import { useStyles } from './styles';

interface Props {
  title: string;
  onLeftClick(): void;
  rightElement?: JSX.Element;
}

export default function HeaderSecondary(props: Props) {
  const classes = useStyles();
  const { title, onLeftClick, rightElement } = props;

  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <IconButton onClick={onLeftClick} className={classes.iconBtn}>
          <ArrowBackIos className={classes.iconBack} />
        </IconButton>
        <Typography className={classes.headerTitle}>{title}</Typography>
      </div>
      {rightElement}
    </div>
  );
}

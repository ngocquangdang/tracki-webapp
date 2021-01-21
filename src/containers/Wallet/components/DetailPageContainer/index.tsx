import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { useStyles } from './styles';

interface Props {
  title: string;
  children: JSX.Element;
}

export default function DetailPageContainer(props: Props) {
  const classes = useStyles();

  const { title, children } = props;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ArrowBackIosIcon />
        {title}
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

import React from 'react';

import { useStyles } from './styles';

interface Props {
  children: JSX.Element;
  className?: string;
  header: JSX.Element;
}

export default function Card(props: Props) {
  const classes = useStyles();

  const { children, className, header } = props;
  return (
    <div className={`${classes.card} ${className}`}>
      <div className={classes.header}>{header}</div>
      <div className={classes.container}>{children}</div>
    </div>
  );
}

import React from 'react';

import { useStyles } from './styles';

interface Props {}

export default function Card(props: Props) {
  const classes = useStyles();

  return <div className={classes.cardContainer}></div>;
}

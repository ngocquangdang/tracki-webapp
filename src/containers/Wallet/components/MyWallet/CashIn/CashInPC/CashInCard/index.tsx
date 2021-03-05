import React from 'react';

import { useStyles } from './styles';

interface Props {
  title: string;
  children: React.ReactElement;
}

function CashInCard(props: Props) {
  const classes = useStyles();
  const { title, children } = props;

  return (
    <div className={classes.cashInCard}>
      <div className={classes.cashInTitle}>{title}</div>
      <div className={classes.cashInChildren}>{children}</div>
    </div>
  );
}

export default CashInCard;

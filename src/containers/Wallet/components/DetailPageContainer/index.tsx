import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { useStyles } from './styles';
import clsx from 'clsx';

interface Props {
  title: string;
  children: JSX.Element;
  onClick: () => void;
  isBorder?: boolean;
  width?: number;
}

export default function DetailPageContainer(props: Props) {
  const classes = useStyles();

  const { title, children, onClick, isBorder, width } = props;

  return (
    <div className={classes.container} style={{ width }}>
      <div className={classes.header}>
        <ArrowBackIosIcon onClick={onClick} className={classes.icon} />
        <p className={classes.title}>{title}</p>
      </div>
      <div className={clsx(classes.content, { [classes.border]: isBorder })}>
        {children}
      </div>
    </div>
  );
}

import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { useStyles } from './styles';

interface Props {
  title: string;
  children: JSX.Element;
  onClick: () => void;
}

export default function DetailPageContainer(props: Props) {
  const classes = useStyles();

  const { title, children, onClick } = props;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ArrowBackIosIcon onClick={onClick} className={classes.icon} />
        <p className={classes.title}>{title}</p>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

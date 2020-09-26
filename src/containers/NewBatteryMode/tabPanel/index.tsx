import React from 'react';

import { useStyles } from './styles';

interface Props {
  children: JSX.Element;
  value: number;
  index: number;
}
export default function TabPanel(props: Props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <div className={classes.container}>
          <div className={classes.content}>{children}</div>
        </div>
      )}
    </div>
  );
}

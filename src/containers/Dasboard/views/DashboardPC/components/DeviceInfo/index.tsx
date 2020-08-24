import React from 'react';

import { useStyles } from './styles';
import { AiFillInfoCircle } from 'react-icons/ai';

export default function DeviceInfoComponent(props) {
  const { deviceInfo, t } = props;
  const classes = useStyles();

  return (
    <>
      <div className={`${classes.color} ${classes.header}`}>
        <AiFillInfoCircle className={classes.iconCard} />
        {t('dashboard:device_information')}
      </div>
      {deviceInfo.map((item, index) => (
        <div key={index} className={classes.flexbox}>
          <div className={`${classes.color} ${classes.col1}`}>{item.title}</div>
          <div className={`${classes.color} ${classes.col2}`}>{item.data}</div>
        </div>
      ))}
    </>
  );
}

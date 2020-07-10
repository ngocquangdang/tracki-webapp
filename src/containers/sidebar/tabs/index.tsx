import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { TabStyle, useStyles } from './styled';

export default function TabsSide() {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
      className={classes.heightTab}
    >
      <TabStyle label="Trackers" />
      <TabStyle label="Geo-Fence" />
    </Tabs>
  );
}

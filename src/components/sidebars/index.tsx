import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import TabPanel from './tabPanel';
import Slide from '@material-ui/core/Slide';
import { Content, TabStyle, useStyles } from './styles';
import { Button } from '@material-ui/core';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';

const ListTracker = dynamic(()=> import('./trackers'));
const ListGeoFence = dynamic(()=> import('./geofence'));


export default function SideBar(props: any) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChangee = () => {
    setChecked(prev => !prev);
  };
  return (
    <div>
      <Button onClick={handleChangee} className={classes.btnIcon}>
        <BsFillCaretRightFill />
      </Button>
      <Slide
        direction="right"
        in={checked}
        mountOnEnter
        unmountOnExit
        className={classes.absolutemain}
      >
        <Content>
          <Paper className={classes.border}>
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
            <Button
              onClick={handleChangee}
              className={`${classes.absolute} ${classes.btnIcon}`}
            >
              <BsFillCaretLeftFill />
            </Button>
          </Paper>
          <TabPanel
            value={value}
            index={0}
            placeholder="Search devices by name or ID"
          >
            <ListTracker />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            placeholder="Search geo-fences by name"
          >
            <ListGeoFence />
          </TabPanel>
        </Content>
      </Slide>
    </div>
  );
}

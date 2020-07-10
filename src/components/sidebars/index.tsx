import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import TabPanel from './tabPanel';
import Slide from '@material-ui/core/Slide';
import { Content, Container, TabStyle, useStyles } from './styles';
import { Button } from '@material-ui/core';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';

const ListTracker = dynamic(() => import('./trackers'));
const ListGeoFence = dynamic(() => import('./geofence'));

export default function SideBar(props: any) {
  const { opened, onChange } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  // const [opened, setopened] = useState(false);

  // const handleChangee = () => {
  //   setopened(prev => !prev);
  // };

  return (
    <Container opened>
      <Button
        onClick={() => onChange()}
        className={`${classes.btnIcon} ${classes.absoluteFirst}`}
        style={{ zIndex: opened ? 0 : 1 }}
      >
        <BsFillCaretRightFill />
      </Button>
      <Slide
        direction="right"
        in={opened}
        mountOnEnter
        unmountOnExit
        style={{
          position: 'relative',
          background: '#ffffff',
        }}
      >
        <Content style={{ display: opened ? 'block' : 'none' }}>
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
              onClick={() => onChange()}
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
    </Container>
  );
}

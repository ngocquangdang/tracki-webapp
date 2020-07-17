import React, { useState, useEffect } from 'react';
import Route from 'next/router';
import { Toolbar, AppBar } from '@material-ui/core';
import { AiOutlineDashboard } from 'react-icons/ai';
import {
  NearMe as NearMeIcon,
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
  Contacts as ContactsIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Menu from '../Menu';
import { useStyles } from './styles';

type ROUTE = {
  index: number;
  icon: JSX.Element;
  label: string;
  link: string;
};

const routes = [
  {
    index: 0,
    label: 'View Trackers',
    icon: <NearMeIcon />,
    link: '/home',
  },
  {
    index: 1,
    label: 'Notifications',
    icon: <NotificationsIcon />,
    link: '/notifications',
  },
  {
    index: 2,
    label: 'Dashboard',
    icon: <AiOutlineDashboard style={{ width: '24px', height: '24px' }} />,
    link: '/dashboard',
  },
  {
    index: 3,
    label: 'Tracking',
    icon: <LocationIcon />,
    link: '/tracking',
  },
  {
    index: 4,
    label: 'Reports',
    icon: <BarChartIcon />,
    link: '/reports',
  },
  {
    index: 5,
    label: 'Contacts',
    icon: <ContactsIcon />,
    link: '/contacts',
  },
  {
    index: 6,
    label: 'Settings',
    icon: <SettingsIcon />,
    link: '/settings',
  },
];

export default function Header() {
  const classes = useStyles();
  const [currentLink, setCurrentLink] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    let link = '';
    link = window.location.pathname;
    setCurrentLink(link);
  }, [currentLink]);

  const onClickTab = (r: ROUTE) => () => {
    setCurrentTab(r.index);
    Route.push(r.link);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar className={classes.wrapper}>
          <div className={classes.row}>
            <div className={classes.logoWrapper}>
              <img src={'images/logo.png'} alt="" className={classes.logo} />
            </div>
            <Tabs
              value={currentTab}
              indicatorColor="primary"
              textColor="primary"
              aria-label="tabs menu"
              classes={{ root: classes.tabRoot }}
            >
              {routes.map(r => (
                <Tab
                  key={r.index}
                  value={r.index}
                  onClick={onClickTab(r)}
                  icon={r.icon}
                  label={r.label}
                  classes={{
                    root: classes.tabItemRoot,
                    labelIcon: classes.tabIcon,
                  }}
                />
              ))}
            </Tabs>
          </div>
          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

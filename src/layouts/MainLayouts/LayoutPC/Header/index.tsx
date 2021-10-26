import React, { useState, useEffect } from 'react';
import nextRoute, { useRouter } from 'next/router';
import { Toolbar, AppBar } from '@material-ui/core';
import { AiOutlineDashboard } from 'react-icons/ai';
import {
  NearMe as NearMeIcon,
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
  Contacts as ContactsIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  // ShoppingBasket as ShoppingBasketIcon,
} from '@material-ui/icons';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { WalletIcon } from '@Components/Icon';

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
    link: '/trackers',
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
  // {
  //   index: 7,
  //   label: 'Store',
  //   icon: <ShoppingBasketIcon />,
  //   link: '/store',
  // },
  // {
  //   index: 8,
  //   label: 'Wallet',
  //   icon: <WalletIcon />,
  //   link: '/wallet',
  // },
];

export default function Header() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const route = useRouter();

  useEffect(() => {
    let tabIndex = routes.findIndex(r => route.route.includes(r.link));
    if (tabIndex === -1) {
      if (route.route.includes('change-password')) {
        tabIndex = 6;
      }
      if (
        route.route.includes('geofences') ||
        route.route.includes('trackers')
      ) {
        tabIndex = 0;
      }
    }
    setCurrentTab(tabIndex);
  }, [route]);

  const onClickTab = (r: ROUTE) => () => {
    setCurrentTab(r.index);
    nextRoute.push(r.link);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar className={classes.wrapper}>
          <div className={classes.row}>
            <div
              className={classes.logoWrapper}
              onClick={onClickTab(routes[0])}
            >
              <img src={'/images/logo.png'} alt="" className={classes.logo} />
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
                    selected: classes.isActive,
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

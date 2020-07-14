import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

import Menu from '../Menu';
import { useStyles, LinkStyle, Item } from './styles';

const routes = [
  {
    label: 'View Trackers',
    icon: <NearMeIcon />,
    link: '/home',
  },
  {
    label: 'Notifications',
    icon: <NotificationsIcon />,
    link: '/notifications',
  },
  {
    label: 'Dashboard',
    icon: <AiOutlineDashboard style={{ width: '24px', height: '24px' }} />,
    link: '/dashboard',
  },
  {
    label: 'Tracking',
    icon: <LocationIcon />,
    link: '/tracking',
  },
  {
    label: 'Reports',
    icon: <BarChartIcon />,
    link: '/reports',
  },
  {
    label: 'Contacts',
    icon: <ContactsIcon />,
    link: '/contacts',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    link: '/settings',
  },
];

type MenuType = { icon: JSX.Element; label: string; link: string };

export default function Header() {
  const classes = useStyles();
  const [currentLink, setCurrentLink] = useState('');

  useEffect(() => {
    let link = '';
    link = window.location.pathname;
    setCurrentLink(link);
  }, [currentLink]);
  const onClickLink = (link: string) => () => {
    setCurrentLink(link);
  };

  const renderMenuButton = ({ icon, label, link }: MenuType) => {
    const isActive = link === currentLink;
    return (
      <Item key={label}>
        <Link href={link}>
          <LinkStyle
            onClick={onClickLink(link)}
            color={isActive ? 'primary' : 'secondary'}
            className={classes.linkBtn}
            underline="none"
          >
            {icon} {label}
          </LinkStyle>
        </Link>
      </Item>
      // <Link
      // component="button"
      //   href={link}
      //   key={label}
      //   color={isActive ? 'primary' : 'secondary'}
      //   underline="none"
      //   onClick={onClickLink(link)}
      //   classes={{ button: classes.linkBtn }}
      // >
      //   {icon} {label}
      // </Link>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar className={classes.wrapper}>
          <div className={classes.row}>
            <div className={classes.logoWrapper}>
              <img src={'images/logo.png'} alt="" className={classes.logo} />
            </div>
            <div className={classes.row}>{routes.map(renderMenuButton)}</div>
          </div>
          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

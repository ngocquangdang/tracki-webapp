import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { AiOutlineDashboard } from 'react-icons/ai';
import { useStyles, Item, LinkStyle, Icon, Label, MenuButton } from './style';
import Link from 'next/link';
import {
  LocationOn as LocationIcon,
  Contacts as ContactsIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Call as CallIcon,
  Lock as LockIcon,
  Assignment as AssignmentIcon,
  PlayArrow as PlayIcon,
  PowerSettingsNew as LogoutIcon,
} from '@material-ui/icons';

const routes = [
  {
    label: 'Dashboard',
    icon: <AiOutlineDashboard style={{ width: '24px', height: '24px' }} />,
    link: '/home',
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
    label: 'Account Settings',
    icon: <SettingsIcon />,
    link: '/',
  },
  {
    label: 'Contact Us',
    icon: <CallIcon />,
    link: '/',
  },
  {
    label: 'Privacy Policy',
    icon: <LockIcon />,
    link: '/',
  },
  {
    label: 'User Agreement',
    icon: <AssignmentIcon />,
    link: '/',
  },
  {
    label: 'Video Tutorials',
    icon: <PlayIcon />,
    link: '/',
  },
  {
    label: 'Logout',
    icon: <LogoutIcon />,
    link: '/',
  },
];
type MenuType = { icon: JSX.Element; label: string; link: string };

export default function SideBarMobile(props: any) {
  const classes = useStyles();
  const { open, children } = props;
  const renderMenuButton = ({ icon, label, link }: MenuType) => {
    return (
      <Item key={label}>
        <Link href={link}>
          <LinkStyle
            color={'secondary'}
            className={classes.linkBtn}
            underline="none"
          >
            <Icon>{icon}</Icon>
            <Label>{label}</Label>
          </LinkStyle>
        </Link>
      </Item>
    );
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {children}
      <MenuButton>{routes.map(renderMenuButton)}</MenuButton>
    </Drawer>
  );
}

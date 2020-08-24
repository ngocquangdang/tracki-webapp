import React from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { AiOutlineDashboard } from 'react-icons/ai';
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

import { logoutRequestAction } from '@Containers/App/store/actions';

import { useStyles, Item, LinkStyle, Icon, Label, MenuButton } from './style';

const routes = [
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
    icon: <ContactsIcon style={{ width: '23px', height: '20px' }} />,
    link: '/contacts',
  },
  {
    label: 'Account Settings',
    icon: <SettingsIcon />,
    link: '/settings',
  },
  {
    label: 'Contact Us',
    icon: <CallIcon />,
    link: '/',
  },
  {
    label: 'Privacy Policy',
    icon: <LockIcon />,
    link: '/privacy',
  },
  {
    label: 'User Agreement',
    icon: <AssignmentIcon />,
    link: '/terms',
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
type Props = {
  open: boolean;
  children: JSX.Element;
  logoutRequestAction(): void;
  handleOpenSideBar(): void;
};

function SideBarMobile(props: Props) {
  const { open, children, logoutRequestAction } = props;
  const classes = useStyles();

  const renderMenuButton = ({ icon, label, link }: MenuType) => {
    return (
      <Item
        key={label}
        onClick={label === 'Logout' ? logoutRequestAction : undefined}
      >
        <LinkStyle
          color={'secondary'}
          className={classes.linkBtn}
          underline="none"
          href={link}
        >
          <Icon>{icon}</Icon>
          <Label>{label}</Label>
        </LinkStyle>
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

const mapDispatchToProps = (dispatch: any) => ({
  logoutRequestAction: () => dispatch(logoutRequestAction()),
});

export default connect(null, mapDispatchToProps)(SideBarMobile);

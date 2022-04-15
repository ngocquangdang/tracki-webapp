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
import { signOut } from 'next-auth/react';

// import { WalletIcon } from '@Components/Icon';
import { logoutRequestAction } from '@Containers/App/store/actions';

import { useStyles, Item, LinkStyle, Icon, Label, MenuButton } from './style';

const routes = [
  // {
  //   label: 'Wallet',
  //   icon: <WalletIcon style={{ margin: '0 3px' }} />,
  //   link: '/wallet',
  // },
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

  const onLogout = () => {
    signOut();
    logoutRequestAction();
  };

  const renderMenuButton = ({ icon, label, link }: MenuType) => {
    return (
      <Item key={label} onClick={label === 'Logout' ? onLogout : undefined}>
        <LinkStyle
          color={'secondary'}
          className={classes.linkBtn}
          underline="none"
          href={link}
        >
          <Icon>{icon}</Icon>
          <Label>{label}</Label>
        </LinkStyle>
        {/* {link === '/wallet' && (
          <div className={`${classes.myWallet} ${classes.flexBox}`}>
            <div className={`${classes.coin} ${classes.flexBox}`}>
              <img
                src="./images/coin-points.svg"
                alt=""
                className={classes.icon}
              />
              <p className={classes.cointNumber}>{5000}</p>
            </div>
            <div className={`${classes.wallet} ${classes.flexBox}`}>
              <img src="./images/wallet.png" alt="" className={classes.icon} />
              <p>$24.55</p>
            </div>
          </div>
        )} */}
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

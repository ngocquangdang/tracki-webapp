import React, { useState } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FlagIcon from '@material-ui/icons/Flag';
import { FaGift } from 'react-icons/fa';
import { BiWalletAlt } from 'react-icons/bi';

import { useStyles, Menu } from './styles';
import { Tab, Tabs } from '@material-ui/core';
import Dashboard from '../components/Dashboard';
import MyWallet from '../components/MyWallet';
import FriendInvite from '../components/FriendInvite';
import Notification from '../components/Notification';
import DailyBonus from '../components/DailyBonus';
import SpinWin from '../components/Spin';
import HourlyGifts from '../components/HourlyGift';

interface Props {
  t(key: string, format?: object): string;
}

type ROUTE = {
  index: number;
  icon: JSX.Element;
  title: string;
};

const ITEM = [
  {
    index: 0,
    icon: <DashboardIcon style={{ width: 32, height: 32 }} />,
    title: 'Dashboard',
  },
  {
    index: 1,
    icon: <AccountBalanceWalletIcon style={{ width: 32, height: 32 }} />,
    title: 'My Wallet',
  },
  {
    index: 2,
    icon: <SupervisedUserCircleIcon style={{ width: 32, height: 32 }} />,
    title: 'Friend Invite',
  },
  {
    index: 3,
    icon: <NotificationsIcon style={{ width: 32, height: 32 }} />,
    title: 'Notification',
  },
  {
    index: 4,
    icon: <FlagIcon style={{ width: 32, height: 32 }} />,
    title: 'Daily Bonus',
  },
  {
    index: 5,
    icon: (
      <img src="./images/spin.svg" alt="" style={{ width: 32, height: 32 }} />
    ),
    title: 'Spin & Win',
  },
  {
    index: 6,
    icon: <FaGift style={{ width: 32, height: 32 }} />,
    title: 'Hourly Gift',
  },
];

function WalletDashboard(props: Props) {
  const classes = useStyles();
  const { t } = props;

  const [currentTab, setCurrentTab] = useState(0);

  const onClickTab = (r: ROUTE) => () => {
    setCurrentTab(r.index);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.header}>
        {currentTab === 0 && (
          <div className={classes.title}>
            <BiWalletAlt className={classes.icon} />{' '}
            <p className={classes.caption}>Wallet Dashboard</p>
          </div>
        )}
        <Menu>
          <Tabs
            value={currentTab}
            indicatorColor="primary"
            textColor="primary"
            aria-label="tabs menu"
            classes={{
              root: classes.tabRoot,
              indicator: classes.indicatorStyle,
            }}
          >
            {ITEM.map(r => (
              <Tab
                key={r.index}
                value={r.index}
                onClick={onClickTab(r)}
                icon={r.icon}
                label={r.title}
                classes={{
                  root: classes.tabItemRoot,
                  labelIcon: classes.tabIcon,
                }}
              />
            ))}
          </Tabs>
        </Menu>
      </div>
      <div className={classes.container}>
        {currentTab === 0 && <Dashboard t={t} />}
        {currentTab === 1 && <MyWallet />}
        {currentTab === 2 && <FriendInvite />}
        {currentTab === 3 && <Notification />}
        {currentTab === 4 && <DailyBonus />}
        {currentTab === 5 && <SpinWin />}
        {currentTab === 6 && <HourlyGifts />}
      </div>
    </div>
  );
}

export default WalletDashboard;

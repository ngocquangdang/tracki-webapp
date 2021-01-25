import React, { useState } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FlagIcon from '@material-ui/icons/Flag';
import { FaGift } from 'react-icons/fa';
import { BiWalletAlt } from 'react-icons/bi';
import dynamic from 'next/dynamic';
import { Tab, Tabs } from '@material-ui/core';

import { useStyles, Menu } from './styles';
import { Spin } from '@Components/Icon';
import MyPoint from '../components/Dashboard/components/MypointScreen';
const Dashboard = dynamic(() => import('../components/Dashboard'));
const MyWallet = dynamic(() => import('../components/MyWallet'));
const FriendInvite = dynamic(() => import('../components/FriendInvite'));
const Notification = dynamic(() => import('../components/Notification'));
const DailyBonus = dynamic(() => import('../components/DailyBonus'));
const SpinWin = dynamic(() => import('../components/Spin'));
const HourlyGifts = dynamic(() => import('../components/HourlyGift'));

interface Props {
  t(key: string, format?: object): string;
  isMobile?: boolean;
  hiddenHeader?: string;
  page?: string;
  pointHistory: {
    isRequestPointHistory: boolean;
    pointHistories: object;
    pointHistoryIds: number[];
  };
  setHiddenHeader: (type: string) => void;
  setViewPage: (page: string) => void;
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
    icon: <Spin />,
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
  const {
    t,
    isMobile,
    hiddenHeader,
    page,
    pointHistory,
    setHiddenHeader,
    setViewPage,
  } = props;

  const [currentTab, setCurrentTab] = useState(0);

  const onClickTab = (r: ROUTE) => () => {
    setCurrentTab(r.index);
  };

  const onChangeTab = (tab: number) => setCurrentTab(tab);

  return (
    <div className={classes.layout}>
      {(!!isMobile || hiddenHeader !== 'hidden') && (
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
                    selected: classes.isActive,
                  }}
                />
              ))}
            </Tabs>
          </Menu>
        </div>
      )}
      {!page && (
        <div className={classes.container}>
          {currentTab === 0 && (
            <Dashboard t={t} onChangeTab={onChangeTab} isMobile={isMobile} />
          )}
          {currentTab === 1 && <MyWallet t={t} />}
          {currentTab === 2 && <FriendInvite />}
          {currentTab === 3 && <Notification />}
          {currentTab === 4 && <DailyBonus />}
          {currentTab === 5 && <SpinWin />}
          {currentTab === 6 && <HourlyGifts />}
        </div>
      )}

      {page === 'my_point' && (
        <MyPoint
          t={t}
          pointHistory={pointHistory}
          setHiddenHeader={setHiddenHeader}
          setViewPage={setViewPage}
        />
      )}
    </div>
  );
}

export default WalletDashboard;

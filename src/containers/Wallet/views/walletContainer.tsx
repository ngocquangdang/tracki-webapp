import React, { useEffect, useState } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FlagIcon from '@material-ui/icons/Flag';
import { FaGift } from 'react-icons/fa';
import { BiWalletAlt } from 'react-icons/bi';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Tab, Tabs } from '@material-ui/core';

// style
import { useStyles, Menu } from './styles';

// component
import { Spin } from '@Components/Icon';
import { firebaseLogEventRequest } from '@Utils/firebase';
const Dashboard = dynamic(() => import('../components/Dashboard'));
const MyWallet = dynamic(() => import('../components/MyWallet/PC'));
const FriendInvite = dynamic(() => import('../components/FriendInvite'));
const Notification = dynamic(() => import('../components/Notification'));
const DailyBonus = dynamic(() => import('../components/DailyBonus'));
const SpinWin = dynamic(() => import('../components/Spin'));
const HourlyGifts = dynamic(() => import('../components/HourlyGift'));
const MyWalletSP = dynamic(() => import('../components/MyWallet/SP'));

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
  const { t, isMobile, hiddenHeader, page } = props;
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    switch (router.pathname) {
      case '/wallet/my-wallet':
        setCurrentTab(1);
        break;

      default:
        setCurrentTab(0);
        break;
    }
  }, [router]);

  const getLogFirebaseSelectTab = (tab: number) => {
    switch (tab) {
      case 1:
        firebaseLogEventRequest('wallet_page', 'my_wallet_screen');
        router.push('/wallet/my-wallet');
        break;
      case 2:
        firebaseLogEventRequest('wallet_page', 'friend_invite_screen');
        router.push('/wallet/invite');
        break;
      case 3:
        firebaseLogEventRequest('wallet_page', 'notification_screen');
        router.push('/wallet/notifications');
        break;
      case 4:
        firebaseLogEventRequest('wallet_page', 'daily_bonus_screen');
        router.push('/wallet/daily_bonus');
        break;
      case 5:
        firebaseLogEventRequest('wallet_page', 'spin_win_screen');
        router.push('/wallet/spinner');
        break;
      case 6:
        firebaseLogEventRequest('wallet_page', 'hourly_gift_screen');
        router.push('/wallet/hourly_gift');
        break;
      default:
        firebaseLogEventRequest('wallet_page', 'dashboard_screen');
        router.push('/wallet');
        break;
    }
  };

  const onClickTab = (r: ROUTE) => () => {
    // setCurrentTab(r.index);
    getLogFirebaseSelectTab(r.index);
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
          {currentTab === 1 &&
            (isMobile ? <MyWalletSP t={t} /> : <MyWallet t={t} />)}
          {currentTab === 2 && <FriendInvite />}
          {currentTab === 3 && <Notification />}
          {currentTab === 4 && <DailyBonus />}
          {currentTab === 5 && <SpinWin />}
          {currentTab === 6 && <HourlyGifts />}
        </div>
      )}
    </div>
  );
}

export default WalletDashboard;

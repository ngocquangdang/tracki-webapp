import React, { useState } from 'react';
import { AiOutlineGift } from 'react-icons/ai';
import moment from 'moment';

// compoment
import DrawerPanel from '@Components/Drawer';
import Card from '../Card';

// style
import { useStyles } from './styles';

// interface
interface Props {
  t(key: string): string;
  pointHistory: {
    isRequestPointHistory: boolean;
    pointHistories: object;
    pointHistoryIds: number[];
  };
  isMobile?: boolean;
}

export default function PointHistory(props: Props) {
  const classes = useStyles();
  const { t, pointHistory, isMobile } = props;
  const { pointHistories = {}, pointHistoryIds = [] } = pointHistory;

  const [isViewMore, setIsViewMore] = useState(false);

  const tonggleOpenDrawer = () => setIsViewMore(true);
  const tonggleCloseDrawer = () => setIsViewMore(false);

  const getIcon = type => {
    switch (type) {
      case 'gift':
        return <AiOutlineGift className={classes.giftIcon} />;
      case 'free':
        return (
          <img
            src="./images/calender.svg"
            alt=""
            className={classes.calenderIcon}
          />
        );
      case 'invite':
        return (
          <img
            src="./images/tracki-device.png"
            alt=""
            className={classes.img}
          />
        );
      case 'ticket':
        return <AiOutlineGift className={classes.ticketIcon} />;
      default:
        break;
    }
  };

  const limitHistoryIds = pointHistoryIds.slice(0, 5);

  return (
    <>
      <Card
        t={t}
        isHeader={true}
        title={t('wallet:point_history')}
        onClick={tonggleOpenDrawer}
        isMobile={isMobile}
      >
        <>
          {limitHistoryIds.map(id => (
            <div className={classes.card} key={id}>
              <div className={classes.flexBox}>
                <div className={classes.icon}>
                  {getIcon(pointHistories[id].type)}
                </div>
                <div>
                  <p className={`${classes.mr0} ${classes.name}`}>
                    {pointHistories[id].name}
                  </p>
                  <p className={`${classes.mr0}  ${classes.time}`}>
                    {moment(pointHistories[id].updated * 1000).format('LLL')}
                  </p>
                </div>
              </div>
              <p className={`${classes.mr0}  ${classes.point}`}>
                + {pointHistories[id].point} {t('wallet:points')}
              </p>
            </div>
          ))}
        </>
      </Card>
      <DrawerPanel
        anchor="right"
        isOpen={isViewMore}
        onClose={tonggleCloseDrawer}
        title={t('wallet:point_history')}
        className={classes.drawerWidth}
      >
        <>
          <div className={classes.content}>
            <DrawerContainer
              pointHistories={pointHistories}
              pointHistoryIds={pointHistoryIds}
              t={t}
            />
          </div>
        </>
      </DrawerPanel>
    </>
  );
}

function DrawerContainer(props) {
  const classes = useStyles();
  const { pointHistories, pointHistoryIds, t } = props;

  const getIcon = type => {
    switch (type) {
      case 'gift':
        return <AiOutlineGift className={classes.giftIcon} />;
      case 'free':
        return (
          <img
            src="./images/calender.svg"
            alt=""
            className={classes.calenderIcon}
          />
        );
      case 'invite':
        return (
          <img
            src="./images/tracki-device.png"
            alt=""
            className={classes.img}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {pointHistoryIds.map(id => (
        <div className={classes.card} key={id}>
          <div className={classes.flexBox}>
            <div className={classes.icon}>
              {getIcon(pointHistories[id].type)}
            </div>
            <div>
              <p className={`${classes.mr0} ${classes.name}`}>
                {pointHistories[id].name}
              </p>
              <p className={`${classes.mr0}  ${classes.time}`}>
                {moment(pointHistories[id].updated * 1000).format('LLL')}
              </p>
            </div>
          </div>
          <p className={`${classes.mr0}  ${classes.point}`}>
            + {pointHistories[id].point} {t('wallet:points')}
          </p>
        </div>
      ))}
    </>
  );
}

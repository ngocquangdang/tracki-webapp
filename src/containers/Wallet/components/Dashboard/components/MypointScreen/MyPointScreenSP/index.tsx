import React, { useState } from 'react';
import { AiOutlineGift } from 'react-icons/ai';
import moment from 'moment';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// component
import { TicketIcon } from '@Components/Icon';
import { Button } from '@Components/buttons';
import MyPointHistorySkeleton from '@Components/Skeletons/PointHistoryCard';

// style
import { useStyles } from './styles';

interface Props {
  t(key: string, format?: object): string;
  point?: number;
  pointHistory: {
    isRequestPointHistory: boolean;
    pointHistories: object;
    pointHistoryIds: number[];
  };
}

export default function MyPoint(props: Props) {
  const classes = useStyles();
  const routes = useRouter();

  const { t, point = 0, pointHistory } = props;

  const { pointHistoryIds = [], pointHistories = {} } = pointHistory;
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const getIcon = type => {
    switch (type) {
      case 'gift':
        return <AiOutlineGift className={classes.giftIcon} />;
      case 'free':
        return (
          <img
            src="static/images/calender.svg"
            alt=""
            className={classes.calenderIcon}
          />
        );
      case 'invite':
        return (
          <img
            src="static/images/tracki-device.png"
            alt=""
            className={classes.img}
          />
        );
      case 'ticket':
        return <TicketIcon className={classes.ticketIcon} />;
      default:
        break;
    }
  };

  const onGetMore = () => {
    setIsLoadMore(true);
    setTimeout(() => {
      setIsLoadMore(false);
      setPage(page + 1);
    }, 3000);
  };

  const onBack = () => routes.back();

  const rowPerPage = pointHistoryIds.slice(0, page * 10);

  return (
    <div className={classes.container}>
      <div className={`${classes.header}`}>
        <p
          className={`${classes.title} ${classes.flexBox} ${classes.mr0} ${classes.nav}`}
          onClick={onBack}
        >
          <ArrowBackIosIcon className={classes.backIcon} />
          {t('wallet:my_points')}
        </p>

        <div
          className={`${classes.contentHeader} ${classes.flexBox} ${classes.spaceBetween}`}
        >
          <div
            className={`${classes.item} ${classes.direction} ${classes.flexBox}`}
          >
            <div className={`${classes.flexBox} ${classes.mb10}`}>
              <img
                src="static/images/coin-points.svg"
                alt=""
                className={classes.bigCoin}
              />
              <p className={`${classes.mr0} ${classes.point}`}>{point}</p>
            </div>
            <p className={`${classes.description} ${classes.mr0} `}>
              {t('wallet:point_worth', { points: 0 })}
            </p>
          </div>
          <div className={classes.footer}>
            <img
              src="static/images/coin-points.svg"
              alt=""
              className={classes.normalCoin}
            />
            {t('wallet:redeem_my_poin')}
            <img
              src="static/images/money.svg"
              alt=""
              className={classes.moneyIcon}
            />
          </div>
        </div>
      </div>
      <div className={classes.mt50}>
        <div className={classes.titleCard}>{t('wallet:point_history')}</div>
        <div>
          {rowPerPage.map(id => (
            <div className={classes.card} key={id}>
              <div className={classes.flexBox}>
                <div className={classes.icon}>
                  {getIcon(pointHistories[id].type)}
                </div>
                <div>
                  {pointHistories[id].type === 'ticket' && (
                    <p className={classes.subTicket}>
                      {t('wallet:you_received_point')}
                    </p>
                  )}

                  <p className={`${classes.mr0} ${classes.name}`}>
                    {pointHistories[id].name}
                  </p>
                  <p className={`${classes.mr0}  ${classes.time}`}>
                    {moment(pointHistories[id].updated * 1000).format('LLL')}
                  </p>
                </div>
              </div>
              <p className={`${classes.mr0}  ${classes.pointHistory}`}>
                + {pointHistories[id].point} {t('wallet:points')}
              </p>
            </div>
          ))}
          {isLoadMore &&
            new Array(10)
              .fill(0)
              .map((i, index) => <MyPointHistorySkeleton key={index} />)}
          <Button
            classes={classes.btnBackground}
            text={t('wallet:see_more_point_history')}
            onClick={onGetMore}
            isLoading={isLoadMore}
            disabled={
              isLoadMore || rowPerPage.length === pointHistoryIds.length
            }
          />
        </div>
      </div>
    </div>
  );
}

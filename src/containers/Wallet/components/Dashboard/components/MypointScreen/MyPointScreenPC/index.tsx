import React, { useState } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { AiOutlineGift } from 'react-icons/ai';
import moment from 'moment';

// component
import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';
import { TicketIcon } from '@Components/Icon';
import { Button } from '@Components/buttons';
import MyPointHistorySkeleton from '@Components/Skeletons/PointHistoryCard';

// style
import { useStyles } from './styles';
import { MainLayout } from '@Layouts';

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
            src="/images/calender.svg"
            alt=""
            className={classes.calenderIcon}
          />
        );
      case 'invite':
        return (
          <img
            src="/images/tracki-device.png"
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

  const onBackDashBoard = () => {};
  const rowPerPage = pointHistoryIds.slice(0, page * 10);

  return (
    <MainLayout hasFooter={false}>
      <DetailPageContainer
        title={t('wallet:my_points')}
        onClick={onBackDashBoard}
        isBorder
      >
        <div className={classes.container}>
          <div className={`${classes.header} ${classes.paddingContainer}`}>
            <p className={classes.title}>{t('wallet:my_points')}</p>
            <div
              className={`${classes.contentHeader} ${classes.flexBox} ${classes.spaceBetween}`}
            >
              <div
                className={`${classes.item} ${classes.direction} ${classes.flexBox}`}
              >
                <p
                  className={`${classes.contentTitle} ${classes.mr0} ${classes.mb10}`}
                >
                  {t('wallet:balance_points')}
                </p>
                <div className={`${classes.flexBox} ${classes.mb10}`}>
                  <img
                    src="/images/coin-points.svg"
                    alt=""
                    className={classes.bigCoin}
                  />
                  <p className={`${classes.mr0} ${classes.point}`}>{point}</p>
                </div>
                <p className={`${classes.description} ${classes.mr0} `}>
                  {t('wallet:point_worth', { points: 0 })}
                </p>
              </div>
              <div className={classes.item}>
                <div className={classes.footer}>
                  <img
                    src="/images/coin-points.svg"
                    alt=""
                    className={classes.normalCoin}
                  />
                  {t('wallet:redeem_my_poin')}
                  <ChevronRightIcon />
                  <img
                    src="/images/money.svg"
                    alt=""
                    className={classes.moneyIcon}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${classes.content} ${classes.paddingContainer}`}>
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
                        {moment(pointHistories[id].updated * 1000).format(
                          'LLL'
                        )}
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
      </DetailPageContainer>
    </MainLayout>
  );
}

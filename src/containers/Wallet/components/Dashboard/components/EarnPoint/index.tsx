import React, { useState } from 'react';

// component
import Card from '../Card';
import { Button } from '@Components/buttons';
import DrawerPanel from '@Components/Drawer';

// styles
import { useStyles } from './styles';

interface Props {
  t(key: string, format?: object): string;
  adv: {
    advs?: object;
    advIds?: number[];
  };
  isMobile?: boolean;
}

export default function EarnPoint(props: Props) {
  const classes = useStyles();

  const { t, adv, isMobile } = props;
  const { advs = {}, advIds = [] } = adv;
  const [isViewMore, setIsViewMore] = useState(false);

  const tonggleOpenDrawer = () => setIsViewMore(true);
  const tonggleCloseDrawer = () => setIsViewMore(false);

  return (
    <>
      <Card
        t={t}
        isHeader={true}
        title={t('wallet:earn_points')}
        onClick={tonggleOpenDrawer}
        isMobile={isMobile}
      >
        <>
          {advIds.map(id => (
            <div className={classes.card} key={id}>
              <div>
                <p className={classes.title}>{advs[id].adv_name}</p>
                <div className={`${classes.flexBox} ${classes.cointLine}`}>
                  <img src="static/images/coin-points.svg" alt="" />
                  <p className={`${classes.flexBox} ${classes.coin}`}>
                    {advs[id].point}
                  </p>{' '}
                  {t('wallet:points')}
                </div>
              </div>
              <Button
                classes={classes.btnBackground}
                text={
                  advs[id].type === 'share' ? t('wallet:share') : t('wallet:go')
                }
              />
            </div>
          ))}
        </>
      </Card>
      <DrawerPanel
        anchor="right"
        isOpen={isViewMore}
        onClose={tonggleCloseDrawer}
        title={t('wallet:earn_more_points')}
        className={classes.drawerWidth}
      >
        <>
          <div className={classes.content}>
            <DrawerContainer advs={advs} advIds={advIds} t={t} />
          </div>
          <div className={classes.footer}>
            <p className={classes.drawerTitle}>
              {t('wallet:invite_friend_earn_cash')}
            </p>
            <p className={classes.subTitle}>
              {t('wallet:sub_percent_you_can_get')}
            </p>
            <Button
              text={t('wallet:invite_friend')}
              classes={classes.normalBtn}
              color="primary"
              type="submit"
            ></Button>
          </div>
        </>
      </DrawerPanel>
    </>
  );
}

function DrawerContainer(props) {
  const classes = useStyles();

  const { advs, advIds, t } = props;
  return (
    <>
      {advIds.map(id => (
        <div className={classes.card} key={id}>
          <div>
            <p className={classes.title}>{advs[id].adv_name}</p>
            <div className={`${classes.flexBox} ${classes.cointLine}`}>
              <img src="static/images/coin-points.svg" alt="" />
              <p className={`${classes.flexBox} ${classes.coin}`}>
                {advs[id].point}
              </p>{' '}
              {t('wallet:points')}
            </div>
          </div>
          <Button
            classes={classes.btnBackground}
            text={
              advs[id].type === 'share' ? t('wallet:share') : t('wallet:go')
            }
          />
        </div>
      ))}
    </>
  );
}

import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IoIosPricetag } from 'react-icons/io';
import { NavigateNext as NavigateNextIcon } from '@material-ui/icons';

import { Button } from '@Components/buttons';
import DetailCarts from '../DetailCarts';
import { TAB_KEYS } from '@Containers/Store/store/constants';
import { useStyles } from './styles';

interface Props {
  isMobile: boolean;
  viewMode: string;
  changeStoreView(mode: string): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function TabsPC(props: Props) {
  const { t, changeStoreView } = props;

  const classes = useStyles();
  const [currentTab, setTab] = useState(0);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    changeStoreView(TAB_KEYS[newValue]);
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Tabs
          value={currentTab}
          onChange={onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          {TAB_KEYS.map((key: string, index: number) => (
            <Tab
              key={key}
              label={t('common:' + key)}
              value={index}
              className={classes.tabItem}
            />
          ))}
        </Tabs>
      </Paper>
      <div className={classes.containerCart}>
        <div className={classes.cartHeader}>
          <span className={classes.textAdd}>{t('common:add_to_cart')}</span>
          <div className={classes.contentNumberCart}>
            <ShoppingCartIcon className={classes.iconShopping} />
            <div className={classes.numberCart}>0</div>
          </div>
        </div>
        <div className={classes.listCardBuy}>
          <DetailCarts />
          <DetailCarts />
          <DetailCarts />
          <DetailCarts />
        </div>
        <Button
          variant="text"
          classes={classes.selectCouponButton}
          text={
            <div className={classes.selectCoupon}>
              <IoIosPricetag className={classes.iconTag} />
              <div className={classes.textCoupon}>
                {t('common:select_coupon')}
              </div>
              <NavigateNextIcon className={classes.iconNext} />
            </div>
          }
        />
        <div className={classes.totalMoney}>
          <span className={classes.textTotal}>{t('common:total')}</span>
          <span className={classes.numberTotal}>$316.40</span>
        </div>
        <div className={classes.containerButton}>
          <Button
            variant="contained"
            text={t('common:checkout')}
            color={'primary'}
            fullWidth={true}
            className={classes.btn}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

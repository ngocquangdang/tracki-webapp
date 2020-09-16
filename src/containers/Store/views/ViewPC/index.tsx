import React, { Fragment } from 'react';
import {
  Favorite as FavoriteIcon,
  List as ListIcon,
  ShoppingBasket as ShoppingBasketIcon,
} from '@material-ui/icons';
import { IoIosPricetag } from 'react-icons/io';

import Tabs from './components/Tabs';
import { useStyles } from './styles';
import CardProduct from './components/CardProduct';
import SavedView from './components/Saved';
import CouponsView from './components/Coupons';

interface Props {
  isMobile: boolean;
  viewMode: string;
  changeStoreView(mode: string): void;
  products: object;
  productIds: Array<number | string>;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function StoreContainer(props: Props) {
  const { viewMode, ...rest } = props;
  const handleClickProduct = id => {
    console.log('xxxxxxxxxxxxxxxxxxx', id);
  };
  const classes = useStyles();
  const renderTitleHeader = (viewMode: string) => {
    switch (viewMode) {
      case 'saved':
        return (
          <div className={classes.title}>
            <FavoriteIcon className={classes.iconTitle} />
            <span className={classes.textTitle}>Saved</span>
          </div>
        );
      case 'coupons':
        return (
          <div className={classes.title}>
            <IoIosPricetag className={classes.iconTitle} />
            <span className={classes.textTitle}>Coupons</span>
          </div>
        );
      case 'orders':
        return (
          <div className={classes.title}>
            <ListIcon className={classes.iconList} />
            <span className={classes.textTitle}>Orders</span>
          </div>
        );

      default:
        return (
          <div className={classes.title}>
            <ShoppingBasketIcon className={classes.iconTitle} />
            <span className={classes.textTitle}>Store</span>
          </div>
        );
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <Tabs {...rest} viewMode={viewMode} />
      </div>
      <div className={classes.content}>
        {renderTitleHeader(viewMode)}
        {viewMode === 'store' && (
          <div className={classes.listCard}>
            {rest.productIds?.map(id => (
              <Fragment key={id}>
                <CardProduct
                  product={rest.products[id]}
                  handleClickProduct={handleClickProduct}
                />
              </Fragment>
            ))}
          </div>
        )}
        {viewMode === 'saved' && (
          <div className={classes.listCard}>
            <SavedView />
            <SavedView />
            <SavedView />
            <SavedView />
            <SavedView />
          </div>
        )}
        {viewMode === 'coupons' && (
          <div className={classes.listCard}>
            <CouponsView />
            <CouponsView />
            <CouponsView />
            <CouponsView />
            <CouponsView />
          </div>
        )}
        {viewMode === 'orders' && <div>orders</div>}
      </div>
    </div>
  );
}

import React, { Fragment, useEffect } from 'react';
import {
  Favorite as FavoriteIcon,
  List as ListIcon,
  ShoppingBasket as ShoppingBasketIcon,
} from '@material-ui/icons';
import { IoIosPricetag } from 'react-icons/io';

import { useInjectSaga } from '@Utils/injectSaga';
import storeSaga from '@Containers/Store/store/sagas';

import { SkeletonProductCard } from '@Components/Skeletons';
import Tabs from './components/Tabs';
import CardProduct from './components/CardProduct';
import SavedView from './components/Saved';
import CouponsView from './components/Coupons';
import { useStyles, PaginationStyle } from './styles';

interface Props {
  isMobile: boolean;
  viewMode: string;
  changeStoreView(mode: string): void;
  fetchDataProducts(data: object): void;
  fetchDataCoupons(data: object): void;
  products: object;
  productIds: Array<number | string>;
  coupons: object;
  couponIds: Array<number | string>;
  totalProducts: number;
  isLoading: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function StoreContainer(props: Props) {
  useInjectSaga({ key: 'store', saga: storeSaga });

  const { viewMode, fetchDataProducts, fetchDataCoupons, ...rest } = props;

  const classes = useStyles();
  console.log('props', props);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    fetchDataProducts({
      page: page + 1,
      perPage: rowsPerPage,
    });
  }, [fetchDataProducts, page, rowsPerPage]);

  useEffect(() => {
    fetchDataCoupons({
      page: 1,
      perPage: 10,
    });
  }, [fetchDataCoupons]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickProduct = id => {
    console.log('handleClickProduct > id', id);
  };

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
        {viewMode === 'store' &&
          (rest.isLoading ? (
            <div className={classes.skeletonLoad}>
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
              <SkeletonProductCard />
            </div>
          ) : (
            rest.productIds && (
              <table>
                <tbody className={classes.listCard}>
                  {rest.productIds?.map(id => (
                    <Fragment key={id}>
                      <CardProduct
                        product={rest.products[id]}
                        handleClickProduct={handleClickProduct}
                      />
                    </Fragment>
                  ))}
                </tbody>
                <tfoot className={classes.rowPage}>
                  <tr>
                    <PaginationStyle
                      rowsPerPageOptions={[10, 20, 30]}
                      count={rest.totalProducts}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      labelRowsPerPage="Item per page"
                    />
                  </tr>
                </tfoot>
              </table>
            )
          ))}
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

import React, { Fragment, useEffect, useState } from 'react';

import { useInjectSaga } from '@Utils/injectSaga';
import saga from '@Containers/ProductsStore/store/sagas';

import { SkeletonProductCard } from '@Components/Skeletons';
import CardProduct from './components/CardProduct';
import { useStyles, PaginationStyle } from './styles';

interface Props {
  isMobile: boolean;
  fetchDataProducts(data: object): void;
  products: object;
  productIds: Array<number | string>;
  totalProducts: number;
  isLoading: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function ProductsStoreViewPC(props: Props) {
  useInjectSaga({ key: 'product', saga });

  const { fetchDataProducts, ...rest } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchDataProducts({
      page: page + 1,
      perPage: rowsPerPage,
    });
  }, [fetchDataProducts, page, rowsPerPage]);

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

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {rest.isLoading ? (
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
        )}
      </div>
    </div>
  );
}

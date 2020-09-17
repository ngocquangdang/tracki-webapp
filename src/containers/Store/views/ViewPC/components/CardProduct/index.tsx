import React from 'react';

import { useStyles, Image } from './styles';

type Product = {
  id: number;
  name: string;
  images: any;
  price: string;
};

interface Props {
  product: Product;
  handleClickProduct(id: number): void;
}

export default function CardProduct(props: Props) {
  const { product, handleClickProduct } = props;
  const classes = useStyles();
  const onClickProduct = (id: number) => () => {
    handleClickProduct(id);
  };
  return (
    <tr className={classes.container} onClick={onClickProduct(product.id)}>
      <th className={classes.content}>
        <Image
          background={product.images[0]?.src || '/images/img-tracker-store.png'}
        />
        <div className={classes.deviceName}>
          {product.name.length > 57
            ? `${product.name.slice(0, 55)}...`
            : product.name}
        </div>
        <div className={classes.price}>{product.price}</div>
      </th>
    </tr>
  );
}

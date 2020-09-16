import React from 'react';

import { useStyles, Image, DefaultImage } from './styles';

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
    <div className={classes.container} onClick={onClickProduct(product.id)}>
      <div className={classes.content}>
        {product.images ? (
          <Image background={product.images[0]?.src} />
        ) : (
          <DefaultImage background={'/images/image-device.png'} />
        )}
        <div className={classes.deviceName}>
          {product.name.length > 80
            ? `${product.name.slice(0, 80)}...`
            : product.name}
        </div>
        <div className={classes.price}>{product.price}</div>
      </div>
    </div>
  );
}

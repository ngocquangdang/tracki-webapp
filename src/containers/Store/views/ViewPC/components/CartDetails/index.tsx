import React from 'react';

import { useStyles } from './styles';
import { Button } from '@Components/buttons';

function CartDetails() {
  const classes = useStyles();
  const onRemoveItem = () => {
    console.log('remove');
  };
  const onPlusQuantity = () => {
    console.log('plus quantity');
  };
  const onMinusQuantity = () => {
    console.log('onMinusQuantity');
  };
  return (
    <div className={classes.container}>
      <img
        src="/images/tracki-device-store.png"
        alt="images"
        className={classes.productImage}
      ></img>
      <div className={classes.contentCard}>
        <div className={classes.deviceName}>
          Tracki 2020 Model Mini Real time GPS Tracker
        </div>
        <div className={classes.quantity}>
          <Button
            variant="text"
            classes={classes.plusBtn}
            text={<div className={classes.iconPlus}>-</div>}
            onClick={onPlusQuantity}
          ></Button>
          <div className={classes.numberQuantity}> Quantity: x 1</div>
          <Button
            variant="text"
            classes={classes.plusBtn}
            text={<div className={classes.iconMinus}>+</div>}
            onClick={onMinusQuantity}
          ></Button>
        </div>
      </div>
      <div className={classes.rightItem}>
        <div className={classes.price}>$38.88</div>
        <Button
          variant="text"
          classes={classes.removeBtn}
          text="Remove"
          onClick={onRemoveItem}
        />
      </div>
    </div>
  );
}

export default CartDetails;

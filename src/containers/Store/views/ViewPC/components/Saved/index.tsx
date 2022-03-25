import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

import { Button } from '@Components/buttons';

import { useStyles } from './styles';

export default function SavedView() {
  const classes = useStyles();
  const onClickViewStore = () => {
    console.log('onClickViewStore');
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.leftItem}>
          <img
            src="static/images/tracki-device-store.png"
            alt="images"
            className={classes.productImage}
          />
          <div className={classes.deviceName}>
            Tracki 2020 Model Mini Real time GPS Tracker
          </div>
          <IconButton className={classes.icon}>
            <FavoriteIcon className={classes.iconFavorite} />
          </IconButton>
        </div>
        <div className={classes.rightItem}>
          <Button
            variant="text"
            classes={classes.btnViewStore}
            text="View in Store"
            onClick={onClickViewStore}
          />
        </div>
      </div>
    </div>
  );
}

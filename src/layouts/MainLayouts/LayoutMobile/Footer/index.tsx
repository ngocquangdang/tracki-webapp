import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ClickAwayListener } from '@material-ui/core';
import {
  NearMe as NearMeIcon,
  Notifications as NotificationsIcon,
  MyLocation as MyLocationIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Layers as LayerIcon,
} from '@material-ui/icons';

import { makeSelectMapTile } from '@Containers/App/store/selectors';
import { changeMapTileAction } from '@Containers/App/store/actions';
import MapTiles from '@Components/Maps/components/MapTiles';
import { useStyles, LinkStyle } from './styles';

interface Props {
  t(key: string): string;
  trackerId?: number;
  mapTile: string;
  changeMapTile(tile: string): void;
  [data: string]: any;
}

function Footer(props: Props) {
  const { t, mapTile, changeMapTile } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const onShowLayer = () => setIsOpen(!isOpen);
  const onCloseLayer = () => setIsOpen(false);

  return (
    <div className={classes.footer}>
      <div className={classes.navLink}>
        <Link href="/notifications">
          <LinkStyle
            color="secondary"
            className={classes.linkBtnMobile}
            underline="none"
          >
            {<NotificationsIcon />} {t('common:notifications')}
          </LinkStyle>
        </Link>
      </div>
      <div className={classes.navLink}>
        <Link href="/">
          <LinkStyle
            color="secondary"
            className={classes.linkBtnMobile}
            underline="none"
          >
            {<MyLocationIcon />} {t('common:current_location')}
          </LinkStyle>
        </Link>
      </div>
      <div className={classes.navLink}>
        <Link href="/trackers">
          <LinkStyle
            color="secondary"
            className={classes.linkBtnMobile}
            underline="none"
          >
            {<NearMeIcon />} {t('common:view_all')}
          </LinkStyle>
        </Link>
      </div>
      <div className={classes.navLink}>
        <LinkStyle
          color="secondary"
          className={classes.linkBtnMobile}
          underline="none"
          href="https://tracki.com/products/tracki-gps-tracker"
        >
          {<ShoppingBasketIcon />} {t('common:store')}
        </LinkStyle>
      </div>
      <ClickAwayListener onClickAway={onCloseLayer}>
        <div className={classes.navLink}>
          <div onClick={!isOpen ? onShowLayer : undefined}>
            <LinkStyle
              color="secondary"
              className={classes.linkBtnMobile}
              underline="none"
            >
              {<LayerIcon />} {t('common:map_type')}
            </LinkStyle>
          </div>
          <MapTiles
            t={t}
            mapTile={mapTile}
            changeMapTile={changeMapTile}
            onClose={onCloseLayer}
            className={isOpen ? classes.display : ''}
          />
        </div>
      </ClickAwayListener>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  mapTile: makeSelectMapTile(),
});

const mapDispatchToProps = dispatch => ({
  changeMapTile: (tile: string) => dispatch(changeMapTileAction(tile)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(Footer);

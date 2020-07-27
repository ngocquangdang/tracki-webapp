import React, { useState, useEffect } from 'react';
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
import { Menu, useStyles, LinkStyle, Item } from './styles';

interface Props {
  t(key: string): string;
  trackerId?: number;
  mapTile: string;
  changeMapTile(tile: string): void;
  [data: string]: any;
}

function Footer(props: Props) {
  const { t, trackerId, mapTile, changeMapTile } = props;
  const classes = useStyles();
  const [currentLink, setCurrentLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const link = window.location.pathname;
    setCurrentLink(link);
  }, [currentLink]);
  const onClickLink = (link: string) => () => {
    setCurrentLink(link);
  };
  const isActive = currentLink;

  const onShowLayer = () => setIsOpen(!isOpen);
  const onCloseLayer = () => setIsOpen(false);

  return (
    <Menu>
      {trackerId ? (
        <div> hihi</div>
      ) : (
        <>
          <Item>
            <Link href="/notifications">
              <LinkStyle
                onClick={onClickLink('/notifications')}
                color={isActive ? 'primary' : 'secondary'}
                className={classes.linkBtnMobile}
                underline="none"
              >
                {<NotificationsIcon />} {t('common:notifications')}
              </LinkStyle>
            </Link>
          </Item>
          <Item>
            <Link href="/dashboard">
              <LinkStyle
                onClick={onClickLink('/dashboard')}
                color={isActive ? 'primary' : 'secondary'}
                className={classes.linkBtnMobile}
                underline="none"
              >
                {<MyLocationIcon />} {t('common:current_location')}
              </LinkStyle>
            </Link>
          </Item>
          <Item>
            <Link href="/trackers">
              <LinkStyle
                onClick={onClickLink('/trackers')}
                color="secondary"
                className={classes.linkBtnMobile}
                underline="none"
              >
                {<NearMeIcon />} {t('common:view_all')}
              </LinkStyle>
            </Link>
          </Item>
          <Item>
            <Link href="/tracking">
              <LinkStyle
                onClick={onClickLink('/tracking')}
                color={isActive ? 'primary' : 'secondary'}
                className={classes.linkBtnMobile}
                underline="none"
              >
                {<ShoppingBasketIcon />} {t('common:store')}
              </LinkStyle>
            </Link>
          </Item>
          <ClickAwayListener onClickAway={onCloseLayer}>
            <div>
              <Item onClick={!isOpen ? onShowLayer : undefined}>
                <LinkStyle
                  color={'secondary'}
                  className={classes.linkBtnMobile}
                  underline="none"
                  style={{ color: '#fff' }}
                >
                  {<LayerIcon />} {t('common:map_type')}
                </LinkStyle>
              </Item>
              <MapTiles
                t={t}
                mapTile={mapTile}
                changeMapTile={changeMapTile}
                onClose={onCloseLayer}
                className={isOpen ? classes.display : ''}
              />
            </div>
          </ClickAwayListener>
        </>
      )}
    </Menu>
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

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClickAwayListener } from '@material-ui/core';
import {
  NearMe as NearMeIcon,
  Notifications as NotificationsIcon,
  MyLocation as MyLocationIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Layers as LayerIcon,
} from '@material-ui/icons';

import MapTiles from '@Components/Maps/components/MapTiles';
import { Menu, useStyles, LinkStyle, Item } from './styles';

interface Props {
  t(key: string): string;
  trackerId?: number;
}

export default function Footer(props: Props) {
  const { t, trackerId } = props;
  const classes = useStyles();
  const [currentLink, setCurrentLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let link = '';
    link = window.location.pathname;
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

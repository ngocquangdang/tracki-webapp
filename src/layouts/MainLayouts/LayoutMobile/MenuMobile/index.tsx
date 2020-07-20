import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, useStyles, LinkStyle, Item } from './styles';
import {
  NearMe as NearMeIcon,
  Notifications as NotificationsIcon,
  MyLocation as MyLocationIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Layers as LayerIcon,
} from '@material-ui/icons';
const routes = [
  {
    label: 'Notifications',
    icon: <NotificationsIcon />,
    link: '/notifications',
  },
  {
    label: 'Dashboard',
    icon: <MyLocationIcon />,
    link: '/dashboard',
  },
  {
    label: 'View All',
    icon: <NearMeIcon />,
    link: '/trackers',
  },
  {
    label: 'Store',
    icon: <ShoppingBasketIcon />,
    link: '/tracking',
  },
  {
    label: 'Map type',
    icon: <LayerIcon />,
    link: '/map-type',
  },
];

type MenuType = { icon: JSX.Element; label: string; link: string };

export default function MenuMobile(props: any) {
  const classes = useStyles();
  const [currentLink, setCurrentLink] = useState('');
  useEffect(() => {
    let link = '';
    link = window.location.pathname;
    setCurrentLink(link);
  }, [currentLink]);
  const onClickLink = (link: string) => () => {
    setCurrentLink(link);
  };

  const renderMenuButton = ({ icon, label, link }: MenuType) => {
    const isActive = link === currentLink;
    return (
      <Item key={label}>
        <Link href={link}>
          <LinkStyle
            onClick={onClickLink(link)}
            color={isActive ? 'primary' : 'secondary'}
            className={classes.linkBtnMobile}
            underline="none"
          >
            {icon} {label}
          </LinkStyle>
        </Link>
      </Item>
    );
  };
  return <Menu>{routes.map(renderMenuButton)}</Menu>;
}

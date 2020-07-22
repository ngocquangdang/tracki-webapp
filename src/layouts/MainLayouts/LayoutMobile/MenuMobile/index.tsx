import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  useStyles,
  LinkStyle,
  Item,
  LayerPanel,
  TopPanel,
  LayerItem,
  Title,
  ItemLayer,
  Image,
  Name,
} from './styles';
import {
  NearMe as NearMeIcon,
  Notifications as NotificationsIcon,
  MyLocation as MyLocationIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Layers as LayerIcon,
} from '@material-ui/icons';
import { MdClose } from 'react-icons/md';

interface Props {
  t: Function;
  trackerId?: number;
}
export default function MenuMobile(props: Props) {
  const { t, trackerId } = props;
  const classes = useStyles();
  const [currentLink, setCurrentLink] = useState('');
  const [layer] = useState([
    { name: 'street', style: 'streets-v11', image: 'images/whitemap.png' },
    { name: 'out_door', style: 'outdoors-v11', image: 'images/Terrain.png' },
    { name: 'light', style: 'light-v10', image: 'images/Satellite.png' },
    { name: 'dark_map', style: 'dark-v10', image: 'images/DarkMap.png' },
    { name: 'traffic', style: 'satellite-v9', image: 'images/Traffic.png' },
    {
      name: 'hybird',
      style: 'satellite-streets-v11',
      image: 'images/Hybrid.png',
    },
  ]);
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

  const onChangeLayler = layer => window.mapEvents.changeLayer(layer);

  const onShowLayer = () => setIsOpen(!isOpen);

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
                {<NotificationsIcon />} {t('tracker:notifications')}
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
                {<MyLocationIcon />} {t('tracker:dashboard')}
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
                {<NearMeIcon />} {t('tracker:view_all')}
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
                {<ShoppingBasketIcon />} {t('tracker:store')}
              </LinkStyle>
            </Link>
          </Item>
          <Item onClick={onShowLayer}>
            <LinkStyle
              color={isOpen ? 'primary' : 'secondary'}
              className={classes.linkBtnMobile}
              underline="none"
            >
              {<LayerIcon />} {t('tracker:map_type')}
            </LinkStyle>
            <LayerPanel className={isOpen ? classes.display : ''}>
              <TopPanel>
                <Title>{t('auth:map_type')}</Title>
                <MdClose onClick={onShowLayer} />
              </TopPanel>
              <LayerItem>
                {layer?.map((layer, index) => (
                  <ItemLayer
                    key={index}
                    onClick={() => onChangeLayler(layer.style)}
                  >
                    <Image src={layer.image}></Image>
                    <Name>{t(`auth:${layer.name}`)}</Name>
                  </ItemLayer>
                ))}
              </LayerItem>
            </LayerPanel>
          </Item>
        </>
      )}
    </Menu>
  );
}

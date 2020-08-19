import React, { useState } from 'react';
import { MdMyLocation, MdLayers } from 'react-icons/md';
import { Tooltip, ClickAwayListener, Fade } from '@material-ui/core';
import { FiSearch } from 'react-icons/fi';

import SearchLocation from '@Components/SearchLocation';
import MapTiles from '@Components/Maps/components/MapTiles';
import { useStyles, IconButtonStyle } from './styles';

type LatLng = {
  lat: number;
  lng: number;
};

interface Props {
  mapTile: string;
  t(key: string): string;
  changeMapTile(tile: string): void;
  myLocationClick(): void;
  gotoLocation(latlng: LatLng): void;
  [data: string]: any;
}

function MapToolBars(props: Props) {
  const { mapTile, t, gotoLocation, changeMapTile, myLocationClick } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showSearchLocation, setShowSearchLocation] = useState(false);

  const onShowLayer = () => setShowLayerPanel(true);
  const onCloseLayer = () => setShowLayerPanel(false);
  const onShowSearch = () => setShowSearchLocation(true);
  const onCloseSearch = () => setShowSearchLocation(false);
  const goLocation = (latlng: LatLng) => {
    gotoLocation(latlng);
    onCloseSearch();
  };

  return (
    <div className={classes.toolbar}>
      <IconButtonStyle onClick={onShowSearch}>
        <FiSearch />
      </IconButtonStyle>
      <Fade in={showSearchLocation}>
        <div className={classes.searchLocationWrapper}>
          <div className={classes.searchIconWrapper} onClick={onCloseSearch}>
            <FiSearch />
          </div>
          {showSearchLocation && (
            <ClickAwayListener onClickAway={onCloseSearch}>
              <div>
                <SearchLocation
                  t={t}
                  gotoLocation={goLocation}
                  className={classes.searchInput}
                  // autoFocus={true}
                  placeholder={t('tracker:search_address_location')}
                />
              </div>
            </ClickAwayListener>
          )}
        </div>
      </Fade>
      <Tooltip
        title={<span>{t('common:my_location')}</span>}
        placement="left"
        arrow
      >
        <IconButtonStyle onClick={myLocationClick}>
          <MdMyLocation />
        </IconButtonStyle>
      </Tooltip>
      <ClickAwayListener onClickAway={onCloseLayer}>
        <div>
          <Tooltip
            title={<span>{t('common:layer')}</span>}
            placement="left"
            arrow
          >
            <IconButtonStyle onClick={onShowLayer}>
              <MdLayers />
            </IconButtonStyle>
          </Tooltip>
          <MapTiles
            t={t}
            mapTile={mapTile}
            changeMapTile={changeMapTile}
            onClose={onCloseLayer}
            className={showLayerPanel ? classes.display : ''}
          />
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default MapToolBars;

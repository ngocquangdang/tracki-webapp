import React, { useState } from 'react';
import { MdMyLocation, MdLayers } from 'react-icons/md';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import { FiSearch } from 'react-icons/fi';

import MapTiles from '@Components/Maps/components/MapTiles';
import { useStyles, IconButtonStyle } from './styles';

interface Props {
  mapTile: string;
  t(key: string): string;
  changeMapTile(tile: string): void;
  myLocationClick(): void;
  changeZoom(v: number): void;
  [data: string]: any;
}

function MapToolBars(props: Props) {
  const { mapTile, t, changeMapTile, myLocationClick } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  const onShowLayer = () => setShowLayerPanel(!showLayerPanel);
  const onCloseLayer = () => setShowLayerPanel(false);

  const toggleSearch = () => {
    setShowSearchPanel(!showSearchPanel);
  };

  return (
    <div className={classes.toolbar}>
      <IconButtonStyle onClick={toggleSearch}>
        <FiSearch />
      </IconButtonStyle>
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

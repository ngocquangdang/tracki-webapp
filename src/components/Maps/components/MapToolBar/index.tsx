import React, { useState } from 'react';
import { MdMyLocation, MdLayers, MdBorderStyle } from 'react-icons/md';
import { FaStreetView } from 'react-icons/fa';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import { Add, Remove, Refresh } from '@material-ui/icons';

import MapTiles from '../MapTiles';

import {
  ToolBar,
  ZoomButton,
  Text,
  useStyles,
  IconButtonStyle,
} from './styles';

interface Props {
  t(key: string): string;
}

export default function MapToolBars(props: Props) {
  const { t } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isShowName, setIsShowName] = useState(false);

  const onZoomClick = (zoom: number) => () => window.mapEvents.onZoom(zoom);
  const getCurrentLocation = () => {
    window.mapEvents.getUseLocation();
  };

  const onReset = () => window.mapEvents.reset();
  const onShowLayer = () => setIsOpen(!isOpen);
  const onCloseLayer = () => setIsOpen(false);
  const onShowName = () => setIsShowName(!isShowName);

  return (
    <ToolBar>
      <ZoomButton>
        <Tooltip title={<span>Zoom in</span>} placement="left" arrow>
          <IconButtonStyle
            className={`${classes.button} ${classes.borderRadiusTop}`}
            onClick={onZoomClick(0.5)}
          >
            <Add />
          </IconButtonStyle>
        </Tooltip>
        <Tooltip title={<span>{'Zoom Out'}</span>} placement="left" arrow>
          <IconButtonStyle
            className={`${classes.button} ${classes.borderRadiusBottom}`}
            onClick={onZoomClick(-0.5)}
          >
            <Remove />
          </IconButtonStyle>
        </Tooltip>
      </ZoomButton>
      <Tooltip title={<span>{'My location'}</span>} placement="left" arrow>
        <IconButtonStyle onClick={getCurrentLocation}>
          <MdMyLocation />
        </IconButtonStyle>
      </Tooltip>
      <ClickAwayListener onClickAway={onCloseLayer}>
        <div>
          <Tooltip title={<span>Layer</span>} placement="left" arrow>
            <IconButtonStyle onClick={onShowLayer}>
              <MdLayers />
            </IconButtonStyle>
          </Tooltip>
          <MapTiles
            t={t}
            onClose={onCloseLayer}
            className={isOpen ? classes.display : ''}
          />
        </div>
      </ClickAwayListener>
      <Tooltip title={<span>Show name devices</span>} placement="left" arrow>
        <IconButtonStyle onClick={onShowName}>
          <Text>A</Text>
        </IconButtonStyle>
      </Tooltip>
      <Tooltip title={<span>{'Show Geo-fence'}</span>} placement="left" arrow>
        <IconButtonStyle>
          <MdBorderStyle />
        </IconButtonStyle>
      </Tooltip>
      <Tooltip
        title={<span>{'Google Street view'}</span>}
        placement="left"
        arrow
      >
        <IconButtonStyle>
          <FaStreetView />
        </IconButtonStyle>
      </Tooltip>
      <Tooltip title={<span>{'Reset'}</span>} placement="left" arrow>
        <IconButtonStyle onClick={onReset}>
          <Refresh />
        </IconButtonStyle>
      </Tooltip>
    </ToolBar>
  );
}

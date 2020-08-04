import React from 'react';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import { MAP_ACTIONS } from '@Components/Maps/constant';

const MapboxDraw = require('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw');

interface Props {
  map: any;
  mapAction: string;
  changeMapAction(action: string): void;
}

class DrawTool extends React.Component<Props> {
  draw: any;

  componentDidMount() {
    const { map } = this.props;
    this.draw = new MapboxDraw();
    map.addControl(this.draw, 'top-left');
  }

  componentWillReceiveProps(nextProps) {
    const { mapAction } = nextProps;
    const { mapAction: currentMapAction } = this.props;

    if (mapAction !== currentMapAction) {
      let mode = '';
      switch (mapAction) {
        case MAP_ACTIONS.CREATE_CIRCLE:
          mode = 'draw_circle';
          break;
        case MAP_ACTIONS.CREATE_POLYGON:
          mode = 'draw_polygon';
          break;
        default:
          mode = 'simple_select';
          break;
      }
      this.draw.changeMode(mode);
    }
  }

  render() {
    return null;
  }
}

export default DrawTool;

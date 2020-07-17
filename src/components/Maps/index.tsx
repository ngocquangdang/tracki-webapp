import React from 'react';

import Mapbox from './Mapbox';
import './styles.scss';

interface Props {
  mapType: string;
  [data: string]: any;
}

class Map extends React.Component<Props> {
  state = {
    initiatedMap: false,
  };

  initMapCallback = () => {
    console.log('___initMapCallback');
    this.setState({ initiatedMap: true });
  };

  preProps = () => ({
    initMapCallback: this.initMapCallback,
  });

  renderMap = () => {
    const { mapType, ...rest } = this.props;
    const preProps = this.preProps();

    switch (mapType) {
      case 'mapbox':
        return <Mapbox {...preProps} {...rest} />;
      default:
        return <Mapbox {...preProps} {...rest} />;
    }
  };

  render() {
    return <div id="map">{this.renderMap()}</div>;
  }
}

export default Map;

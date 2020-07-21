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
    this.setState({ initiatedMap: true });
  };

  renderMap = () => {
    const { mapType, fullWidth, trackers, trackerIds } = this.props;

    if (mapType === 'mapbox') {
      return (
        <Mapbox
          initMapCallback={this.initMapCallback}
          fullWidth={fullWidth}
          trackers={trackers}
          trackerIds={trackerIds}
        />
      );
    }
  };

  render() {
    return <div id="map">{this.renderMap()}</div>;
  }
}

export default Map;
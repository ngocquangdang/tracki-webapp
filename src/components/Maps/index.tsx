import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectMapAction } from '@Containers/App/store/selectors';
import { changeMapAction } from '@Containers/App/store/actions';

import Mapbox from './Mapbox';
import './styles.scss';

interface Props {
  mapType: string;
  mapAction: string;
  changeMapAction(action: string): void;
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
    const {
      mapType,
      fullWidth,
      trackers,
      trackerIds,
      selectTrackerAction,
      openSideBar,
      mapTile,
      mapAction,
      changeMapAction,
    } = this.props;

    if (mapType === 'mapbox') {
      return (
        <Mapbox
          initMapCallback={this.initMapCallback}
          fullWidth={fullWidth}
          trackers={trackers}
          trackerIds={trackerIds}
          openSideBar={openSideBar}
          onClickMarker={selectTrackerAction}
          mapTile={mapTile}
          mapAction={mapAction}
          changeMapAction={changeMapAction}
        />
      );
    }
  };

  render() {
    return <div id="map">{this.renderMap()}</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  mapAction: makeSelectMapAction(),
});

const mapDispatchToProps = dispatch => ({
  changeMapAction: (mapAction: string) => dispatch(changeMapAction(mapAction)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Map);

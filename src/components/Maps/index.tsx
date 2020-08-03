import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import dynamic from 'next/dynamic';

import { makeSelectMapAction } from '@Containers/App/store/selectors';
import { changeMapAction } from '@Containers/App/store/actions';
import './styles.scss';

const Mapbox = dynamic(() => import('./Mapbox'), { ssr: false });
const Leaflet = dynamic(() => import('./Leaflet'), { ssr: false });

interface Props {
  mapType: string;
  mapAction: string;
  trackers: object;
  trackerIds: Array<number>;
  mapTile: string;
  fullWidth: boolean;
  changeMapAction(action: string): void;
  openSideBar(): void;
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
    const { mapType, selectTrackerAction, ...rest } = this.props;

    if (mapType === 'mapbox') {
      return (
        <Mapbox
          initMapCallback={this.initMapCallback}
          onClickMarker={selectTrackerAction}
          {...rest}
        />
      );
    }
    return (
      <Leaflet
        initMapCallback={this.initMapCallback}
        onClickMarker={selectTrackerAction}
        {...rest}
      />
    );
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

/* eslint-disable no-undef */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { ITracker } from '@Interfaces';
import styles from './styles';
import './style.scss';

interface Props {
  classes: any;
  isMobile?: boolean;
  mapLabel: string;
  tracker: ITracker;
  [data: string]: any;
}

interface State {
  position: {
    lat: number;
    lng: number;
  } | null;
}

class MapStreetView extends React.Component<Props, State> {
  googleMap: any;
  panorama: any;
  steps = 60;
  counter = 0;
  currentLat = 0;
  currentLng = 0;

  moveView = tracker => () => {
    const history = tracker.histories || [];
    const startPoint = history[history.length - 1];

    if (startPoint) {
      const DELTA_LAT = (tracker.lat - startPoint.lat) / this.steps;
      const DELTA_LNG = (tracker.lng - startPoint.lng) / this.steps;
      this.currentLat = (this.currentLat || startPoint.lat) + DELTA_LAT;
      this.currentLng = (this.currentLng || startPoint.lng) + DELTA_LNG;
      this.panorama.setPosition({
        lat: this.currentLat,
        lng: this.currentLng,
      });

      if (this.counter < this.steps) {
        this.counter += 1;
        requestAnimationFrame(this.moveView(tracker));
      } else {
        this.counter = 0;
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    const { tracker: nextTracker } = nextProps;
    const { tracker } = this.props;

    if (nextTracker.device_id !== tracker.device_id) {
      const { lat, lng } = nextTracker;
      const position = lat && lng ? { lat, lng } : null;
      position && this.panorama.setPosition(position);
    } else if (
      (nextTracker.histories || []).length !== (tracker.histories || []).length
    ) {
      this.moveView(nextTracker)();
    }
  }

  componentDidMount() {
    const panoramaOptions = {
      position: { lat: 49.2853171, lng: -123.1119202 },
      pov: { heading: 4, pitch: 10 },
    };
    this.panorama = new google.maps.StreetViewPanorama(
      document.getElementById('googelMapPano'),
      panoramaOptions
    );
  }

  render() {
    const { classes, mapLabel, isMobile } = this.props;

    return (
      <div className={clsx(classes.container, { [classes.mobile]: isMobile })}>
        <div
          className={clsx(classes.mapLabel, {
            [classes.labelMobile]: isMobile,
          })}
          style={{ position: 'absolute' }}
        >
          {mapLabel}
        </div>
        <div id="googelMapPano" className={classes.map} />
      </div>
    );
  }
}

export default withStyles(styles)(MapStreetView);

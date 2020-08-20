import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import PanoramaView from './GoogleStreetView';
import { ITracker } from '@Interfaces';
import styles from './styles';

interface Props {
  classes: any;
  isMobile?: boolean;
  mapLabel: string;
  tracker: ITracker;
  [data: string]: any;
}

class MapStreetView extends React.PureComponent<Props> {
  render() {
    const { classes, mapLabel, tracker, isMobile } = this.props;
    const { lat, lng } = tracker || { lat: 0, lng: 0 };
    const position = lat && lng ? { lat, lng } : null;

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
        <PanoramaView position={position} />
      </div>
    );
  }
}

export default withStyles(styles)(MapStreetView);

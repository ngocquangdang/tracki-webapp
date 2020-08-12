import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import PanoramaView from './GoogleStreetView';
import { ITracker } from '@Interfaces';
import styles from './styles';

interface Props {
  classes: any;
  mapLabel: string;
  tracker: ITracker;
  [data: string]: any;
}

class MapStreetView extends React.PureComponent<Props> {
  render() {
    const {
      classes,
      mapLabel,
      tracker: { lat, lng },
    } = this.props;
    const position = lat && lng ? { lat, lng } : null;

    return (
      <div className={classes.container}>
        <div className={classes.mapLabel} style={{ position: 'absolute' }}>
          {mapLabel}
        </div>
        <PanoramaView position={position} />
      </div>
    );
  }
}

export default withStyles(styles)(MapStreetView);

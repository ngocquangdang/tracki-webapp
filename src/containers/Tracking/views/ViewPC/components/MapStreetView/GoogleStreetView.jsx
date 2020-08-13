import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
} from 'react-google-maps';

import { GOOGLE_API_KEY } from '@Definitions/app';
import './style.scss';

const StreetViewPanormaWithAnOverlayView = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 49.2853171, lng: -123.1119202 },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={props.position || props.center}>
    <StreetViewPanorama
      defaultPosition={props.position || props.center}
      visible
    />
  </GoogleMap>
));

export default StreetViewPanormaWithAnOverlayView;

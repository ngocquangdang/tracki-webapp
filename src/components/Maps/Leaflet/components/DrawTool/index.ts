import React from 'react';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw-src';
import 'leaflet-path-drag';

import { MAP_ACTIONS } from '@Components/Maps/constant';
import './styles.scss';

const optionsDefault = {
  shapeOptions: {
    color: '#168449',
    opacity: 0.8,
    weight: 2,
    fillColor: '#168449',
    fillOpacity: 0.2,
  },
  draggable: true,
};

interface Props {
  map: any;
  mapAction: string;
  newGeofence: any;
  editGeofenceId: number;
  t(k: string): string;
  updateNewGeofence(geo: object): void;
  updateGeofence(geoId: number, data: object): void;
  changeMapAction(action: string): void;
}

class LeafletTool extends React.Component<Props> {
  polygonDrawHandler: any;
  circleDrawHandler: any;
  rectangleDrawHandler: any;
  drawnItems: any;

  componentWillReceiveProps(nextProps) {
    const { mapAction } = nextProps;
    const { mapAction: currentAction } = this.props;

    if (
      mapAction !== currentAction &&
      this.polygonDrawHandler &&
      this.circleDrawHandler &&
      this.rectangleDrawHandler
    ) {
      switch (mapAction) {
        case MAP_ACTIONS.CREATE_RECTANGLE:
          this.rectangleDrawHandler.enable();
          this.circleDrawHandler.disable();
          this.polygonDrawHandler.disable();
          return;
        case MAP_ACTIONS.CREATE_CIRCLE:
          this.circleDrawHandler.enable();
          this.rectangleDrawHandler.disable();
          this.polygonDrawHandler.disable();
          return;
        case MAP_ACTIONS.CREATE_POLYGON:
          this.polygonDrawHandler.enable();
          this.circleDrawHandler.disable();
          this.rectangleDrawHandler.disable();
          return;
        default:
          this.polygonDrawHandler.disable();
          this.circleDrawHandler.disable();
          this.rectangleDrawHandler.disable();
          break;
      }
    }
  }

  onMapClick = () => {
    const { mapAction } = this.props;
    if (mapAction === MAP_ACTIONS.CREATE_CIRCLE) {
      this.circleDrawHandler.enable();
      this.polygonDrawHandler.disable();
      this.rectangleDrawHandler.disable();
    }
  };

  vertexEditing = event => {
    console.log('vertexEditing', event);
    const { poly } = event;
    const {
      editGeofenceId,
      newGeofence,
      updateNewGeofence,
      updateGeofence,
    } = this.props;

    if (newGeofence) {
      updateNewGeofence({
        ...newGeofence,
        preferences: {
          ...newGeofence.preferences,
          vertices: poly._latlngs[0],
        },
      });
    } else {
      updateGeofence(editGeofenceId, {
        preferences: {
          trigger: 'BOTH',
          vertices: poly._latlngs[0],
        },
      });
    }
  };

  createGeofence = e => {
    const {
      updateNewGeofence,
      mapAction,
      updateGeofence,
      editGeofenceId,
    } = this.props;
    const { layerType, layer } = e;
    let data;
    if (layerType === 'circle') {
      const {
        _latlng: { lat, lng },
        _mRadius,
      } = layer;
      data = {
        preferences: {
          trigger: 'BOTH',
          center: { lat, lng },
          radius: _mRadius,
        },
      };
    } else {
      const {
        _bounds: { _northEast, _southWest },
        _latlngs,
      } = layer;
      const isPolygon = mapAction === MAP_ACTIONS.CREATE_POLYGON;
      const vertices = isPolygon
        ? _latlngs[0]
        : {
            northeast: _northEast,
            southwest: _southWest,
          };
      data = {
        preferences: {
          trigger: 'BOTH',
          vertices,
        },
      };
    }
    if (editGeofenceId) {
      updateGeofence(editGeofenceId, data);
    } else {
      updateNewGeofence(data);
    }
  };

  componentDidMount() {
    const { t, map } = this.props;

    if (L.drawLocal) {
      L.drawLocal.draw.handlers.polygon = {
        tooltip: {
          start: t('click_start_drawing_shape'),
          cont: t('click_continue_drawing_shape'),
          end: t('click_first_point_close_shape'),
        },
      };
      L.drawLocal.draw.handlers.polyline = {
        tooltip: {
          start: t('click_map_drawing_line'),
          cont: t('click_continue_drawing_line'),
          end: t('click_last_point_end_line'),
        },
        error: `<strong>${t('error_drawing_shape')}:</strong> ${t(
          'shape_edges_cannot_cross'
        )}`,
      };

      L.drawLocal.draw.handlers.circle = {
        tooltip: {
          start: `<strong>${t('click_drag_drawing_circle')}</strong>`,
        },
        radius: `<strong>${t('common_radius')}</strong>`,
      };

      L.drawLocal.draw.handlers.simpleshape = {
        tooltip: {
          end: `<strong>${t('release_mouse_finish_drawing')}</strong>`,
        },
      };

      this.polygonDrawHandler = new L.Draw.Polygon(map, optionsDefault);
      this.circleDrawHandler = new L.Draw.Circle(map, optionsDefault);
      this.rectangleDrawHandler = new L.Draw.Rectangle(map, optionsDefault);
      this.drawnItems = new L.FeatureGroup();

      map.addLayer(this.drawnItems);
      map.on('draw:created', this.createGeofence);
      map.on('draw:editvertex', this.vertexEditing);
    }
  }

  render() {
    return null;
  }
}

export default LeafletTool;

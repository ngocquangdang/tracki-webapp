import React from 'react';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw-src';
import 'leaflet-path-drag';

import { MAP_ACTIONS } from '@Components/Maps/constant';
import { IGeofence } from '@Interfaces';
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
  editable: true,
};

interface Props {
  map: any;
  mapAction: string;
  newGeofence: any;
  editGeofence: IGeofence;
  t(k: string): string;
  updateNewGeofence(geo: object): void;
  updateGeofence(geoId: number, data: object): void;
  changeMapAction(action: string): void;
}

class LeafletTool extends React.Component<Props> {
  polygonDrawHandler: any;
  circleDrawHandler: any;
  rectangleDrawHandler: any;

  componentWillReceiveProps(nextProps) {
    const { mapAction, newGeofence, editGeofence } = nextProps;
    const {
      mapAction: currentAction,
      newGeofence: currNewGeo,
      editGeofence: currEditGeo,
    } = this.props;

    if (mapAction !== currentAction) {
      this.toggleDrawTool(mapAction);
    }

    // update draw color
    const geo = newGeofence || editGeofence;
    const curGeo = currNewGeo || currEditGeo;
    if (geo && curGeo && geo.color !== curGeo.color) {
      const newOpts = {
        ...optionsDefault,
        shapeOptions: {
          ...optionsDefault.shapeOptions,
          color: geo.color,
          fillColor: geo.color,
        },
      };
      this.polygonDrawHandler.setOptions(newOpts);
      this.circleDrawHandler.setOptions(newOpts);
      this.rectangleDrawHandler.setOptions(newOpts);
    }
  }

  toggleDrawTool = (mapAction: string) => {
    this.polygonDrawHandler.disable();
    this.circleDrawHandler.disable();
    this.rectangleDrawHandler.disable();
    this.polygonDrawHandler.setOptions(optionsDefault);
    this.circleDrawHandler.setOptions(optionsDefault);
    this.rectangleDrawHandler.setOptions(optionsDefault);

    switch (mapAction) {
      case MAP_ACTIONS.CREATE_RECTANGLE:
        this.rectangleDrawHandler.enable();
        return;
      case MAP_ACTIONS.CREATE_CIRCLE:
        this.circleDrawHandler.enable();
        return;
      case MAP_ACTIONS.CREATE_POLYGON:
        this.polygonDrawHandler.enable();
        return;
      default:
        break;
    }
  };

  vertexEditing = event => {
    console.log('vertexEditing', event);
    const { poly } = event;
    const {
      editGeofence,
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
      updateGeofence(editGeofence.id, {
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
      editGeofence,
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
    this.props.map.removeLayer(layer);
    if (editGeofence) {
      updateGeofence(editGeofence.id, data);
    } else {
      updateNewGeofence(data);
    }
    // this.props.changeMapAction('DEFAULT');
  };

  componentDidMount() {
    const { t, map, mapAction } = this.props;

    if (L.drawLocal) {
      L.drawLocal.draw.handlers.polygon = {
        tooltip: {
          start: t('tracker:click_start_drawing_shape'),
          cont: t('tracker:click_continue_drawing_shape'),
          end: t('tracker:click_first_point_close_shape'),
        },
      };
      L.drawLocal.draw.handlers.polyline = {
        tooltip: {
          start: t('tracker:click_map_drawing_line'),
          cont: t('tracker:click_continue_drawing_line'),
          end: t('tracker:click_last_point_end_line'),
        },
        error: t('tracker:error_drawing_polyline'),
      };

      L.drawLocal.draw.handlers.circle = {
        tooltip: {
          start: `<strong>${t('tracker:click_drag_drawing_circle')}</strong>`,
        },
        radius: `<strong>${t('tracker:radius')}</strong>`,
      };

      L.drawLocal.draw.handlers.rectangle = {
        tooltip: {
          start: t('tracker:click_drag_drawing_rectangle'),
        },
      };

      L.drawLocal.draw.handlers.simpleshape = {
        tooltip: {
          end: `<strong>${t('tracker:release_mouse_finish_drawing')}</strong>`,
        },
      };

      this.polygonDrawHandler = new L.Draw.Polygon(map, optionsDefault);
      this.circleDrawHandler = new L.Draw.Circle(map, optionsDefault);
      this.rectangleDrawHandler = new L.Draw.Rectangle(map, optionsDefault);
      this.toggleDrawTool(mapAction);
      map.on(L.Draw.Event.CREATED, this.createGeofence);
      map.on(L.Draw.Event.EDITVERTEX, this.vertexEditing);
    }
  }

  render() {
    return null;
  }
}

export default LeafletTool;

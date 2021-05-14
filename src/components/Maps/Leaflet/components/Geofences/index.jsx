import React from 'react';
import L from 'leaflet';

const COLOR_DEFAULT = '#168449';

class Geofences extends React.Component {
  constructor(props) {
    super(props);
    window.geosDrawn = {};
    window.geosMobile = {};
    this.windowGeoKey = props.isGeofenceMobile ? 'geosMobile' : 'geosDrawn';
  }

  onClick = geoId => () => {
    console.log('___click GEO_ID', geoId);
  };

  onDragStart = e => {
    e.target.editing.disable();
  };

  onDragEnd = geoId => evt => {
    console.log('___dragEND GEO_ID', geoId, evt);
    const { geofences, newGeofence, updateGeofence, updateNewGeofence } =
      this.props;

    evt.target.editing.enable();
    let preferences = { trigger: 'BOTH' };
    const geoType = newGeofence ? newGeofence.type : geofences[geoId].type;

    if (geoType) {
      if (geoType === 'circle') {
        preferences.center = evt.target._latlng;
        preferences.radius = evt.target._mRadius;
      } else {
        preferences.vertices =
          geoType === 'rectangle'
            ? {
                northeast: evt.target._bounds._northEast,
                southwest: evt.target._bounds._southWest,
              }
            : evt.target._latlngs[0];
      }
      newGeofence
        ? updateNewGeofence({ ...newGeofence, preferences })
        : updateGeofence(geoId, { preferences });
    }
  };

  changeRadius = geoId => evt => {
    console.log('___changeRadius', geoId, evt);
    const { newGeofence, updateGeofence, updateNewGeofence } = this.props;
    const preferences = {
      trigger: 'BOTH',
      radius: evt.target._mRadius,
      center: evt.target._latlng,
    };
    newGeofence
      ? updateNewGeofence({ ...newGeofence, preferences })
      : updateGeofence(geoId, { preferences });
  };

  removeGeofence = id => {
    if (window[this.windowGeoKey][id]) {
      this.props.map.removeLayer(window[this.windowGeoKey][id]);
      delete window[this.windowGeoKey][id];
    }
  };

  componentWillReceiveProps(nextProps) {
    const { newGeofence, editGeofenceId, geofences, showGeofences } = nextProps;
    const {
      newGeofence: currentNewGeofence,
      editGeofenceId: currentGeoId,
      showGeofences: thisShowGeofences,
      geofences: currentGeofences,
    } = this.props;

    if (showGeofences !== thisShowGeofences && !showGeofences) {
      Object.keys(currentGeofences).map(this.removeGeofence);
    }

    if (newGeofence && currentNewGeofence) {
      if (newGeofence.type !== currentNewGeofence.type) {
        this.removeGeofence(newGeofence.id);
        this.renderGeo(newGeofence);
      }
    }
    if (editGeofenceId !== currentGeoId) {
      if (window[this.windowGeoKey][editGeofenceId]) {
        window[this.windowGeoKey][editGeofenceId].editing.enable();
      }
      if (window[this.windowGeoKey][currentGeoId]) {
        window[this.windowGeoKey][currentGeoId].editing.disable();
      }
    }

    // only for polygon
    const geo = editGeofenceId ? geofences[editGeofenceId] : newGeofence;
    if (geo && geo.type === 'polygon') {
      setTimeout(() => {
        this.removeGeofence(geo.id);
        this.renderGeo(geo, true);
      }, 300);
    }
  }

  drawRectangle = (geofence, editable) => {
    const {
      id,
      color = COLOR_DEFAULT,
      preferences: { vertices },
    } = geofence;
    const { map } = this.props;
    if (
      !window[this.windowGeoKey][id] &&
      vertices &&
      vertices.northeast &&
      vertices.southwest
    ) {
      const rectangle = L.rectangle([vertices.northeast, vertices.southwest], {
        color,
        weight: 2,
        editable: editable,
        draggable: editable,
      });
      rectangle.addTo(map);
      rectangle.on('click', this.onClick(id));
      rectangle.on('dragstart', this.onDragStart);
      rectangle.on('dragend', this.onDragEnd(id));
      rectangle.on('edit', this.onDragEnd(id));
      window[this.windowGeoKey][id] = rectangle;
    }
  };

  drawCircle = (geofence, editable) => {
    const {
      id,
      color = COLOR_DEFAULT,
      preferences: { center, radius },
    } = geofence;
    const { map } = this.props;
    if (!window[this.windowGeoKey][id] && center) {
      const circle = L.circle(center, {
        radius,
        color,
        weight: 2,
        editable: editable,
        draggable: editable,
      });
      circle.addTo(map);
      circle.on('click', this.onClick(id));
      circle.on('dragstart', this.onDragStart);
      circle.on('dragend', this.onDragEnd(id));
      circle.on('edit', this.changeRadius(id));
      window[this.windowGeoKey][id] = circle;
    }
  };

  drawPolygon = (geofence, editable) => {
    const {
      id,
      color = COLOR_DEFAULT,
      preferences: { vertices },
    } = geofence;
    const { map } = this.props;
    if (!window[this.windowGeoKey][id] && vertices && vertices.length > 0) {
      const polygon = L.polygon(vertices, {
        color,
        weight: 2,
        editable: editable,
        draggable: editable,
      });
      polygon.addTo(map);
      polygon.on('click', this.onClick(id));
      polygon.on('dragstart', this.onDragStart);
      polygon.on('dragend', this.onDragEnd(id));
      window[this.windowGeoKey][id] = polygon;
    }
  };

  renderGeo = (geofence, editable = false) => {
    if (this.props.showGeofences || editable) {
      if (geofence.type === 'rectangle') {
        return this.drawRectangle(geofence, editable);
      }
      if (geofence.type === 'circle') {
        return this.drawCircle(geofence, editable);
      }
      return this.drawPolygon(geofence, editable);
    }
  };

  renderGeofences = () => {
    const { geofences, editGeofenceId } = this.props;
    Object.keys(geofences).map(geoId => {
      const ediable = (editGeofenceId || '').toString() === geoId.toString();
      return this.renderGeo(geofences[geoId], ediable);
    });
    return null;
  };

  render() {
    const { newGeofence } = this.props;
    return (
      <React.Fragment>
        {this.renderGeofences()}
        {newGeofence && this.renderGeo(newGeofence, true)}
      </React.Fragment>
    );
  }
}

export default Geofences;

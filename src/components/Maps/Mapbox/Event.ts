import mapboxgl from 'mapbox-gl';
import geoViewport from '@mapbox/geo-viewport';

interface COORDINATE {
  lat: number;
  lng: number;
  [data: string]: any;
}

class MapBoxEvent {
  mapApi: any;
  constructor(mapRef) {
    this.mapApi = mapRef;
  }

  getCenter = () => {
    const { lat, lng } = this.mapApi.getCenter();
    return { lat, lng };
  };

  setCenter = coordinate => this.mapApi.panTo(coordinate);

  setCenterFlyTo = ({ lat, lng, speed, zoom }) =>
    this.mapApi.flyTo({ center: [lng, lat], zoom: zoom, speed: speed });

  getZoom = () => {
    return this.mapApi.getZoom();
  };

  onZoom = (zoomDiff: number) => {
    const currentZoom = this.mapApi.getZoom();
    const nextZoom = currentZoom + zoomDiff;

    this.mapApi.zoomTo(nextZoom);
  };

  setFitBounds = (coordinates: COORDINATE[], callback) => {
    const newCoordinates = coordinates.map(({ lat, lng }) => [lng, lat]);
    const [lngFirst, latFirst] = newCoordinates[0];
    const bounds = newCoordinates.reduce(
      (result, [lng, lat]) => result.extend([lng, lat]),
      new mapboxgl.LngLatBounds([lngFirst, latFirst], [lngFirst, latFirst])
    );
    const arrayBound = bounds.toArray();
    const zoomWithGeo = coordinates.length === 1 ? 18 : 20;
    const viewport = geoViewport.viewport(
      [arrayBound[0][0], arrayBound[0][1], arrayBound[1][0], arrayBound[1][1]],
      [600, 400],
      0,
      zoomWithGeo,
      512,
      true
    );
    this.mapApi.flyTo(viewport);
    callback && callback();
  };

  jumpTo = (coordinate, zoom) =>
    this.mapApi.jumpTo({ center: coordinate, zoom });

  getBounds = () => this.mapApi.getBounds();
}

export default MapBoxEvent;

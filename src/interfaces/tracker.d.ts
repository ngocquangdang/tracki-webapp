import L from 'leaflet';

export interface ITracker {
  status: string;
  age: number;
  gps: boolean;
  device_id: number;
  device_name: string;
  icon_url: string;
  settings_id: number;
  icon_version: string | number;
  type_id: number;
  type: string;
  location_id: number;
  lat: number;
  lng: number;
  speed: number;
  battery: number;
  is_triangulated: boolean;
  location_type: string;
  time: number;
  [data: string]: any;
}

interface RECTANGLE {
  northeast: L.LatLngTuple;
  southwest: L.LatLngTuple;
}

export interface IGeofence {
  id?: any;
  name: string;
  type: string;
  color: string;
  enabled: boolean;
  status: string;
  trackers?: number[];
  preferences: {
    trigger: string;
    vertices?: L.LatLngTuple[] | RECTANGLE; // for polygon
    center?: L.LatLngTuple; // for circle
    radius?: number; // for circle
  };
}

export interface IGeoRectangle extends IGeofence {
  preferences: {
    trigger: string;
    vertices: RECTANGLE;
  };
}

export interface IGeoCircle extends IGeofence {
  preferences: {
    trigger: string;
    center: L.LatLngTuple;
    radius: number;
  };
}

export interface IGeoPolygon extends IGeofence {
  preferences: {
    trigger: string;
    vertices: L.LatLngTuple[];
  };
}

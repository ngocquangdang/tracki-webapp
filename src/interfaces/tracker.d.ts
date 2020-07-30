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

interface COORDINATE {
  lat: number;
  lng: number;
}

interface RECTANGLE {
  northeast: COORDINATE;
  southwest: COORDINATE;
}

export interface IGeofence {
  id: any;
  name: string;
  type: string;
  color: string;
  enabled: boolean;
  status: string;
  trackers?: number[];
  preferences: {
    trigger: string;
    vertices?: COORDINATE[] | RECTANGLE; // for polygon
    centre?: COORDINATE; // for circle
    radius?: number; // for circle
  };
}

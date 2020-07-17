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

import { IGeofence } from '@Interfaces';

export interface PROPS {
  geofences: object;
  newGeofence: IGeofence;
  updateNewGeofence(geo: object): void;
  editGeofenceId: number;
  map: any;
}

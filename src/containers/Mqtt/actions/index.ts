import * as types from '../constants';

export const mqttStart = () => ({ type: types.MQTT_START });
export const mqttConnected = () => ({ type: types.MQTT_CONNECTED });
export const mqttDisconnect = () => ({ type: types.MQTT_DISCONNECT });

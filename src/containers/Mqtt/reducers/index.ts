import produce from 'immer';
import { ActionType } from '@Interfaces';
import * as types from '../constants';

export const initialState = {
  isConnected: false,
  error: null,
  trackersConnected: {},
};

const MQTTReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.MQTT_CONNECTED:
        draft.isConnected = true;
        break;
      case types.MQTT_DISCONNECT:
        draft.isConnected = false;
        break;
      default:
        break;
    }
  });

export default MQTTReducer;

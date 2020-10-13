import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const mqttState = (state: any) => state.mqtt || initialState;

const makeSelectMqttIsConnected = () =>
  createSelector(mqttState, state => state.isConnected);

const makeSelectTrackersConnected = () =>
  createSelector(mqttState, state => state.trackersConnected);

const makeSelectMqttError = () =>
  createSelector(mqttState, state => state.error);

export {
  makeSelectMqttIsConnected,
  makeSelectTrackersConnected,
  makeSelectMqttError,
};

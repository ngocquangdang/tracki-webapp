import { call, fork, takeEvery, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import MQTTClient from '../mqttClient';
import { mqttConnected } from '../actions';
import * as types from '../constants';

function subscribe() {
  const unsubscribe = () => {
    disconnect();
  };

  return eventChannel(emit => {
    MQTTClient.attachMessageHandler((topic, message) => {
      if (topic) {
        // Action Topic
        // EX: emit(mqttAction(...))
        console.log('emit ', emit);
        console.log('message ', message);
        console.log('Topic ', topic);
      }
    });

    return unsubscribe;
  });
}

function* read() {
  const channel = yield call(subscribe);

  yield takeEvery(channel, function* (value) {
    yield put(value);
  });
}

function* publish() {
  while (true) {
    const action = yield take(types.MQTT_PUBLISH);
    if (action.payload) {
      MQTTClient.publish(action.payload.topic, action.payload.message);
    }
  }
}

function* disconnect() {
  while (true) {
    yield take(types.MQTT_DISCONNECT);
    MQTTClient.disconnect();
  }
}

function* handleMQTT() {
  yield fork(read);
  yield fork(disconnect);
  yield fork(publish);
}

function* mqttStartSaga() {
  try {
    yield MQTTClient.connect({
      user: 'tracki',
      password: 'mypasstracki',
      protocol: 'mqtt',
      port: 8081,
      SSL: true,
      debug: true,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      protocolId: 'MQTT',
    });
    yield MQTTClient.attachConnectHandler(() => {
      // subscribe MQTT
      // ex: MQTTClient.subscribe('weather')
      MQTTClient.subscribe('+/+/app');
    });

    yield fork(handleMQTT);
    yield put(mqttConnected());
  } catch (e) {
    console.log(types.MQTT_START, 'ERROR', e);
  }
}

export default function* watchMQTTSaga() {
  yield takeEvery(types.MQTT_START, mqttStartSaga);
}

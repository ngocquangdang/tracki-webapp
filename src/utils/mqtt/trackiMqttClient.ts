import IoTClient from './mqttClient';
import { extend } from 'lodash';

const TrackiMQTTClient = () => {
  const connect = option => {
    return new Promise(resolve => {
      const iotClient = new IoTClient(true);
      iotClient.initClient(extend({ debug: false }, option));
      resolve(iotClient);
    });
  };

  const attachConnectHandler = onConnectHandler => {
    console.log('MQTT_CLIENT > attachConnectHandler');
    const iotClient = new IoTClient();
    iotClient.attachConnectHandler(onConnectHandler);
  };

  const attachMessageHandler = handler => {
    const iotClient = new IoTClient();
    iotClient.attachMessageHandler(handler);
  };

  const publish = (topic, message) => {
    return new Promise(resolve => {
      const iotClient = new IoTClient();
      iotClient.publish(topic, message);
      resolve();
    });
  };

  const subscribe = topic => {
    console.log('MQTT_CLIENT > subscribe', topic);
    const iotClient = new IoTClient();
    iotClient.subscribe(topic);
  };

  const unsubscribe = (topic: string) => {
    const iotClient = new IoTClient();
    iotClient.unsubscribe(topic);
  };

  const disconnect = () => {
    const iotClient = new IoTClient();
    iotClient.disconnect();
  };

  return {
    attachConnectHandler,
    attachMessageHandler,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    publish,
  };
};

export default TrackiMQTTClient();

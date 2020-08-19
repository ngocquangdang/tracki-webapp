import IoTClient from './iotClient';
import { extend } from 'lodash';

const MQTTClient = () => {
  const connect = option => {
    return new Promise(resolve => {
      const iotClient = new IoTClient(true);
      iotClient.initClient(extend({ debug: false }, option));
      resolve(iotClient);
    });
  };

  const attachConnectHandler = onConnectHandler => {
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
    const iotClient = new IoTClient();
    iotClient.subscribe(topic);
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
    publish,
  };
};

export default MQTTClient();

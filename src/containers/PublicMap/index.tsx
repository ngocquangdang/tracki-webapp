import React, { useEffect } from 'react';

import View from './views';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '@Utils/injectSaga';
import { useRouter } from 'next/router';

import saga from './store/sagas';
import reducer from './store/reducers';
import trackerSaga from '@Containers/Trackers/store/sagas';
import trackerReducer from '@Containers/Trackers/store/reducers';
import mqttSaga from '@Containers/Mqtt/sagas';
import mqttReducer from '@Containers/Mqtt/reducers';

import { useInjectReducer } from '@Utils/injectReducer';
import { getDeviceByTokenRequestedAction } from './store/actions';

import { makeSelectIsRequesting } from './store/selectors';
import {
  makeSelectTrackers,
  makeSelectTrackerId,
  makeSelectTrackerIds,
} from '@Containers/Trackers/store/selectors';
import { mqttDisconnect, mqttStart } from '@Containers/Mqtt/actions';

function PublicMap(props) {
  useInjectSaga({ key: 'publictMap', saga });
  useInjectReducer({ key: 'publicMap', reducer });
  useInjectSaga({ key: 'tracker', saga: trackerSaga });
  useInjectReducer({ key: 'tracker', reducer: trackerReducer });
  useInjectSaga({ key: 'mqtt', saga: mqttSaga });
  useInjectReducer({ key: 'mqtt', reducer: mqttReducer });

  const route = useRouter();

  const { getDeviceByToken } = props;

  useEffect(() => {
    const intervalGetDevcie = setInterval(() => {
      getDeviceByToken(route.query.token);
    }, 7000);
    return () => clearInterval(intervalGetDevcie);
  }, [getDeviceByToken]);

  // useEffect(() => {
  //   mqttStart();
  //   return () => {
  //     mqttDisconnect();
  //   };
  // }, [mqttStart, mqttDisconnect]);
  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
  isRequesting: makeSelectIsRequesting(),
  trackerSelected: makeSelectTrackerId(),
});

const mapDispatchToProps = dispatch => ({
  getDeviceByToken: token => dispatch(getDeviceByTokenRequestedAction(token)),
  mqttStart: () => dispatch(mqttStart()),
  mqttDisconnect: () => dispatch(mqttDisconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicMap);

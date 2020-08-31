import React, { useEffect } from 'react';

import View from './views';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '@Utils/injectSaga';

import saga from './store/sagas';
import reducer from './store/reducers';
import { useInjectReducer } from '@Utils/injectReducer';
import { getDeviceByTokenRequestedAction } from './store/actions';
import { makeSelectTracker, makeSelectIsRequesting } from './store/selectors';

function PublicMap(props) {
  useInjectSaga({ key: 'publictMap', saga });
  useInjectReducer({ key: 'publicMap', reducer });
  const { getDeviceByToken } = props;

  useEffect(() => {
    const deviceToken = window.location.search.split('=')[1];
    getDeviceByToken(deviceToken);
  }, [getDeviceByToken]);
  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  trackers: makeSelectTracker(),
  isRequesting: makeSelectIsRequesting(),
});

const mapDispatchToProps = dispatch => ({
  getDeviceByToken: token => dispatch(getDeviceByTokenRequestedAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicMap);

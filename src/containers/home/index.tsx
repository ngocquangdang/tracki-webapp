import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { withTranslation } from '@Server/i18n';
import saga from './trackers/store/sagas';
import reducer from './trackers/store/reducers';
import { getDeviceRequestAction } from './trackers/store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectDivices,
} from './trackers/store/selectors';

import View from './views';

function SettingContainer(props: any) {
  useInjectSaga({ key: 'device', saga });
  useInjectReducer({ key: 'device', reducer });

  const { getDevcieRequest } = props;

  useEffect(() => {
    getDevcieRequest();
  }, [getDevcieRequest]);

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
  devices: makeSelectDivices(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDevcieRequest: (data: any) => dispatch(getDeviceRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(SettingContainer) as React.ComponentType;

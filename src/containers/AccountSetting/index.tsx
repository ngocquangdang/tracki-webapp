import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { withTranslation } from '@Server/i18n';
import saga from './store/sagas';
import reducer from './store/reducers';
import {
  getUserRequestAction,
  updatePrefrenceRequestAction,
  updateInfoUserRequestAction,
} from './store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectUserProfile,
} from './store/selectors';
import UserDetail from './interfaces';

import View from './view';

function SettingContainer(props: UserDetail.IProps) {
  useInjectSaga({ key: 'profile', saga });
  useInjectReducer({ key: 'profile', reducer });

  const { getUserRequestAction } = props;

  useEffect(() => {
    getUserRequestAction();
  }, [getUserRequestAction]);

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
  profile: makeSelectUserProfile(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getUserRequestAction: () => dispatch(getUserRequestAction()),
  updatePrefrence: (data: object) =>
    dispatch(updatePrefrenceRequestAction(data)),
  updateInfoUser: (data: object) => dispatch(updateInfoUserRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(SettingContainer) as React.ComponentType;

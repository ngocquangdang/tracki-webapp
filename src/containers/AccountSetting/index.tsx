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
import { fetchUserRequestedAction } from '@Containers/App/store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectUserProfile,
} from './store/selectors';
import UserDetail from './interfaces';

import View from './view';
import { firebaseLogEventRequest } from '@Utils/firebase';

function SettingContainer(props: UserDetail.IProps) {
  useInjectSaga({ key: 'profile', saga });
  useInjectReducer({ key: 'profile', reducer });

  const { fetchUserRequested, ...rest } = props;
  useEffect(() => {
    firebaseLogEventRequest('settings_page', '');
    fetchUserRequested();
  }, [fetchUserRequested]);

  return <View {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
  profile: makeSelectUserProfile(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getUserRequestAction: accountId => dispatch(getUserRequestAction(accountId)),
  updatePrefrence: (data: object) =>
    dispatch(updatePrefrenceRequestAction(data)),
  updateInfoUser: (data: object) => dispatch(updateInfoUserRequestAction(data)),
  fetchUserRequested: () => dispatch(fetchUserRequestedAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(SettingContainer) as React.ComponentType;

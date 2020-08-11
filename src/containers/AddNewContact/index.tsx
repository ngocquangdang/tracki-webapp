import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import View from './views/AddNewContactPC';
import { withTranslation } from '@Server/i18n';
import { addContactRequestAction } from './stores/actions';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import saga from './stores/saga';
import reducer from './stores/reducer';
import { makeSelectErrors, makeSelectIsRequesting } from './stores/selectors';
import { getContactListRequestAction } from '@Containers/SingleTracker/store/actions';

function AddContactContainer(props) {
  useInjectSaga({ key: 'addNewContact', saga });
  useInjectReducer({ key: 'addNewContact', reducer });
  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
});
const mapDispatchToProps = (dispatch: any) => ({
  addContactAction: (data, callback) =>
    dispatch(addContactRequestAction(data, callback)),
  fetchSelectContact: () => dispatch(getContactListRequestAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(AddContactContainer) as React.ComponentType;

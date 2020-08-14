import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import View from './views';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import saga from './store/sagas';
import reducer from './store/reducers';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectContacts,
  makeSelectContactIds,
} from './store/selector';
import {
  getContactListRequestAction,
  searchContactRequestedAction,
  editContactRequestedAction,
  deleteContactRequestedAction,
  addContactRequestAction,
} from './store/actions/index.';

function ContactView(props) {
  useInjectSaga({ key: 'contacts', saga });
  useInjectReducer({ key: 'contacts', reducer });

  const { getContactListRequest } = props;

  useEffect(() => {
    getContactListRequest();
  }, [getContactListRequest]);

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  iRequesting: makeSelectIsRequesting(),
  contacts: makeSelectContacts(),
  contactIds: makeSelectContactIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  addContactPageRequest: (data, callback) =>
    dispatch(addContactRequestAction(data, callback)),
  getContactListRequest: () => dispatch(getContactListRequestAction()),
  searchContactRequest: (key: string) =>
    dispatch(searchContactRequestedAction(key)),
  editContactRequest: (data, contact_id, callback) =>
    dispatch(editContactRequestedAction(data, contact_id, callback)),
  deleteContactRequest: (contact_id: number, callback) =>
    dispatch(deleteContactRequestedAction(contact_id, callback)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ContactView) as React.ComponentType;

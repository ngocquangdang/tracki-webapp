import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AddTrackerForm from './views/mainForm';

function AddTrackerContainer(props: any) {
  return <AddTrackerForm {...props} />;
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch: any) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(AddTrackerContainer) as React.ComponentType;

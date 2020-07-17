import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';
import { fetchTrackersRequestedAction } from '@Containers/App/store/actions';
import {
  makeSelectLoading,
  makeSelectTrackers,
  makeSelectTrackerIds,
} from '@Containers/App/store/selectors';

import { FiPlus } from 'react-icons/fi';
import SearchIcon from '@material-ui/icons/Search';

import { Container, Content, Footer, SearchBar, useStyles } from './styles';
import { Button } from '@Components/buttons';
import Device from '@Components/DeviceCard';

function ListDeviceTrackerMobile(props: any) {
  const classes = useStyles();
  const { trackers, trackerIds } = props;

  return (
    <Container>
      <SearchBar>
        My Trackers
        <SearchIcon className={classes.iconSearch} />
      </SearchBar>
      <Content>
        {trackerIds
          ? trackerIds.map(id => <Device key={id} tracker={trackers[id]} />)
          : [1, 2].map(i => <Device key={i} isLoading />)}
      </Content>
      <Footer>
        <Button
          classes={`${classes.btn}`}
          text="Add Tracker"
          color="primary"
          type="submit"
          startIcon={<FiPlus />}
        />
      </Footer>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getTrackerRequest: (data: any) =>
    dispatch(fetchTrackersRequestedAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(ListDeviceTrackerMobile) as React.ComponentType;

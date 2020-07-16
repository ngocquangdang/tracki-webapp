import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';
import { fetchDevicesRequestedAction } from '@Containers/App/store/actions';
import {
  makeSelectLoading,
  makeSelectDivices,
} from '@Containers/App/store/selectors';

import { FiPlus } from 'react-icons/fi';
import SearchIcon from '@material-ui/icons/Search';

import { Container, Content, Footer, SearchBar, useStyles } from './styles';
import { Button } from '@Components/buttons';
import Device from '@Components/DeviceCard';

const listDevice = [
  {
    device_name: 'Steve Rodgers truck',
    time: 'Last Updated: 3 days ago',
    id: 1,
  },
  {
    device_name: 'Steve Rodgers truckter',
    time: 'Last Updated: 3 days ago',
    id: 2,
  },
  {
    device_name: 'Steve Rodgers truck truckkkkkkkkkk',
    time: 'Last Updated: 3 days ago',
    id: 3,
  },
  {
    device_name: 'Steve Rodgers truckteraaaaaaaaaaaaaaaaaaaaaaaa',
    time: 'Last Updated: 3 days ago',
    id: 4,
  },
];

function ListDeviceTrackerMobile(props: any) {
  const classes = useStyles();
  // const { isLoading, devices } = props;
  return (
    <Container>
      <SearchBar>
        My Trackers
        <SearchIcon className={classes.iconSearch} />
      </SearchBar>
      <Content>
        {listDevice.map(i => (
          <Device device={i} key={i.id} isLoading />
        ))}
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
  devices: makeSelectDivices(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDevcieRequest: (data: any) => dispatch(fetchDevicesRequestedAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(ListDeviceTrackerMobile) as React.ComponentType;

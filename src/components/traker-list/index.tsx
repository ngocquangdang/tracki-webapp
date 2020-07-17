import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withTranslation } from '@Server/i18n';
import { fetchTrackersRequestedAction } from '@Containers/App/store/actions';
import {
  makeSelectLoading,
  makeSelectTrackerIds,
  makeSelectTrackers,
} from '@Containers/App/store/selectors';

import { FiPlus } from 'react-icons/fi';

import {
  Container,
  Content,
  Footer,
  SearchBar,
  SearchInput,
  Search,
  Title,
  useStyles,
} from './styles';
import { Button } from '@Components/buttons';
import Device from '@Components/DeviceCard';

function ListDeviceTrackerMobile(props: any) {
  const classes = useStyles();
  const [isFullWidth, setWidthSearch] = useState(false);
  const { isLoading, trackers, t, trackerIds } = props;

  const handleFocusInput = () => setWidthSearch(true);
  const handleBlurInput = () => setWidthSearch(false);

  return (
    <Container>
      <SearchBar>
        <Title isFullWidth={isFullWidth}>My Trackers</Title>
        <Search>
          {isFullWidth ? (
            <ArrowBackIosIcon
              className={classes.iconSearch}
              onClick={handleBlurInput}
            />
          ) : (
            <SearchIcon className={classes.iconSearch} />
          )}
          <SearchInput
            placeholder={`${t('common:search')}`}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            isFullWidth={isFullWidth}
          ></SearchInput>
        </Search>
      </SearchBar>
      <Content>
        {trackerIds &&
          trackerIds.map(i => (
            <Device device={trackers[i]} key={i} isLoading={isLoading} />
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
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDevcieRequest: (data: any) => dispatch(fetchTrackersRequestedAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth', 'common'])
)(ListDeviceTrackerMobile) as React.ComponentType;

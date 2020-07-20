import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withTranslation } from '@Server/i18n';
import { fetchTrackersRequestedAction } from '@Containers/App/store/actions';
import {
  searchTrackersRequestedAction,
  selectedSingleTrackerRequestAction,
} from '@Containers/App/store/actions';
import {
  makeSelectLoading,
  makeSelectTrackerIds,
  makeSelectTrackers,
} from '@Containers/App/store/selectors';
import { debounce } from 'lodash';
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

interface Props {
  isLoading: boolean;
  trackers: object;
  t(key: string, format?: object): string;
  trackerIds: Array<number>;
  searchTrackersRequest(key: string | null): void;
  selectedTrackerAction(id: number): void;
  onCloseSidebar(): any;
}

function ListDeviceTrackerMobile(props: Props) {
  const classes = useStyles();
  const [isFullWidth, setWidthSearch] = useState(false);
  const {
    trackers,
    t,
    trackerIds,
    searchTrackersRequest,
    selectedTrackerAction,
    onCloseSidebar,
  } = props;

  const handleFocusInput = () => setWidthSearch(true);
  const handleBlurInput = () => setWidthSearch(false);

  const debounceSearch = debounce(
    (v: string | null) => searchTrackersRequest(v),
    300
  );
  const onClickTracker = id => {
    selectedTrackerAction(id);
    onCloseSidebar();
  };

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
            onChange={event => debounceSearch(event.target.value)}
          ></SearchInput>
        </Search>
      </SearchBar>
      <Content>
        {trackerIds
          ? trackerIds.map(id => (
              // eslint-disable-next-line react/jsx-indent
              <Device
                key={id}
                tracker={trackers[id]}
                isMobile
                onClickTracker={onClickTracker}
              />
            ))
          : [1, 2].map(i => <Device key={i} isLoading isMobile />)}
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
  searchTrackersRequest: (search: string | null) =>
    dispatch(searchTrackersRequestedAction(search)),
  selectedTrackerAction: (id: number) =>
    dispatch(selectedSingleTrackerRequestAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth', 'common'])
)(ListDeviceTrackerMobile) as React.ComponentType;

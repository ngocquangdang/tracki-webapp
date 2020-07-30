import React, { memo, useState } from 'react';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withTranslation } from '@Server/i18n';
import {
  fetchTrackersRequestedAction,
  searchTrackersRequestedAction,
  selectTrackerIdAction,
} from '@Containers/Trackers/store/actions';
import { makeSelectLoading } from '@Containers/App/store/selectors';
import {
  makeSelectTrackerIds,
  makeSelectTrackers,
} from '@Containers/Trackers/store/selectors';
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
import TrackerCard from '@Components/TrackerCard';
import { SkeletonTracker } from '@Components/Skeletons';

type Props = {
  isLoading: boolean;
  trackers: object;
  trackerIds: Array<number>;
  t(key: string, format?: object): string;
  searchTrackersRequest(key: string | null): void;
  selectTrackerAction(id: number): void;
  closeSidebar?(): any;
};

function ListTrackerMobile(props: Props) {
  const classes = useStyles();
  const [isFullWidth, setWidthSearch] = useState(false);
  const {
    trackers,
    trackerIds,
    t,
    searchTrackersRequest,
    selectTrackerAction,
    closeSidebar,
  } = props;

  const handleFocusInput = () => setWidthSearch(true);
  const handleBlurInput = () => setWidthSearch(false);

  const debounceSearch = debounce(
    (v: string | null) => searchTrackersRequest(v),
    300
  );
  const onClickTracker = id => {
    selectTrackerAction(id);
    closeSidebar && closeSidebar();
  };
  const onAddtracker = () => {
    Router.push('/add-tracker');
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
              <TrackerCard
                key={id}
                tracker={trackers[id]}
                isMobile
                onClickTracker={onClickTracker}
              />
            ))
          : [1, 2].map(i => <SkeletonTracker key={i} isMobile />)}
      </Content>
      <Footer>
        <Button
          classes={`${classes.btn}`}
          text="Add Tracker"
          color="primary"
          type="submit"
          onClick={onAddtracker}
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
  selectTrackerAction: (id: number) => dispatch(selectTrackerIdAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth', 'common'])
)(ListTrackerMobile) as any;

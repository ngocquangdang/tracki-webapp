import React, { memo, useState } from 'react';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import { withTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
import { withTranslation } from 'next-i18next';

type Props = {
  isLoading: boolean;
  trackers: object;
  trackerIds: Array<number>;
  t(key: string, format?: object): string;
  searchTrackersRequest(key: string | null): void;
  selectTrackerAction(id: number): void;
  closeSidebar?(): any;
  onClickSetting(id: number): void;
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
    onClickSetting,
  } = props;

  const handleFocusInput = () => setWidthSearch(true);
  const handleBlurInput = () => setWidthSearch(false);

  const debounceSearch = debounce(
    (v: string | null) => searchTrackersRequest(v),
    300
  );
  const onClickTracker = (id: number) => {
    selectTrackerAction(id);
    closeSidebar && closeSidebar();
  };

  const onAddtracker = () => {
    Router.push('/add-tracker');
  };
  return (
    <>
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
                  t={t}
                  key={id}
                  tracker={trackers[id]}
                  isMobile
                  onClickTracker={onClickTracker}
                  onClickSetting={onClickSetting}
                />
              ))
            : [1, 2].map(i => <SkeletonTracker key={i} isMobile />)}
        </Content>
        <Footer>
          <Button
            classes={`${classes.btn}`}
            text="Add a tracker"
            color="primary"
            type="submit"
            onClick={onAddtracker}
            startIcon={<FiPlus />}
          />
        </Footer>
      </Container>
    </>
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
  selectTrackerAction: (id: number, subAccountId: number | null) =>
    dispatch(selectTrackerIdAction(id, subAccountId)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth', 'common'])
)(ListTrackerMobile) as any;

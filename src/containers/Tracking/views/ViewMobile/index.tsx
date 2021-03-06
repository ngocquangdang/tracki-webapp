import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Tabs, Tab, IconButton, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { FaMapMarkerAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';

import { Button } from '@Components/buttons';
import { MainLayout } from '@Layouts';
import { TAB_KEYS } from '@Containers/Tracking/store/constants';
import TrackingSingleView from './components/SingleView';
import SelectTracker from './components/SelectTracker';
import useStyles from './styles';

const TrackingMultiView = dynamic(() => import('./components/MultiView'), {
  ssr: false,
});

interface Props {
  isMobile: boolean;
  viewMode: string;
  trackingIds: number[];
  trackers: object;
  settings: object;
  t(key: string, format?: object): string;
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  getHistoryTracker(data: object): void;
  refreshLocation(data: object): void;
  [data: string]: any;
}

export default function TrackingMobile(props: Props) {
  const {
    trackers,
    trackingIds,
    viewMode,
    t,
    changeTrackingView,
    changeTrackersTracking,
    getHistoryTracker,
    refreshLocation,
  } = props;
  const [showSelectTracker, setShowSelectTracker] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [currentTab, setTab] = useState(0);
  const classes = useStyles();

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    if (
      [TAB_KEYS[2], TAB_KEYS[3]].includes(viewMode) &&
      [0, 1].includes(newValue)
    ) {
      const trackerId = Object.keys(trackers)[0];
      trackerId && changeTrackersTracking([+trackerId]);
    }
    changeTrackingView(TAB_KEYS[newValue]);
  };

  const onCloseTracking = () => {
    window.toggleDrawerMobile();
  };

  const onCloseSelectTracker = () => {
    setShowSelectTracker(false);
  };

  const onClickSelectDevice = () => {
    setShowSelectTracker(true);
  };

  useEffect(() => {
    if (isFirstLoading && !isEmpty(trackers)) {
      const [firstTrackerId] = isEmpty(trackingIds)
        ? Object.keys(trackers)
        : trackingIds;

      if (firstTrackerId) {
        const { lat, lng } = trackers[firstTrackerId];
        lat &&
          lng &&
          window.mapEvents &&
          window.mapEvents.setCenter([lat, lng]);
        changeTrackersTracking([+firstTrackerId]);
        setIsFirstLoading(false);
      }
    }
  }, [
    isFirstLoading,
    trackingIds,
    trackers,
    setIsFirstLoading,
    changeTrackersTracking,
  ]);

  const trackeId = trackingIds[0];
  const tracker = trackers[trackeId];
  const isMultiView = [TAB_KEYS[2], TAB_KEYS[3]].includes(viewMode);

  const renderHeader = () => (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <IconButton onClick={onCloseTracking} className={classes.iconBack}>
          <ArrowBackIosIcon className={classes.icon} />
        </IconButton>
        <Typography className={classes.headerTitle}>Tracking</Typography>
      </div>
      {viewMode !== TAB_KEYS[3] ? (
        <Button
          text={t('tracker:select_device')}
          color="secondary"
          startIcon={<FaMapMarkerAlt className={classes.headerBtnIcon} />}
          onClick={onClickSelectDevice}
          className={classes.headerBtn}
        />
      ) : (
        <Button
          text={t('tracker:show_multiple_trackers')}
          color="secondary"
          className={classes.headerBtn}
        />
      )}
    </div>
  );

  return (
    <React.Fragment>
      <MainLayout isMobile={true} header={renderHeader()} hasFooter={false}>
        <div className={classes.container}>
          {isMultiView ? (
            <div className={classes.mapView}>
              <TrackingMultiView
                t={t}
                isMultiScreen={viewMode === TAB_KEYS[3]}
                isFullWidth={true}
                trackers={trackers}
                trackingIds={trackingIds}
                settings={props.settings}
                changeTrackersTracking={changeTrackersTracking}
                refreshLocation={refreshLocation}
              />
            </div>
          ) : (
            <TrackingSingleView tracker={tracker} {...props} />
          )}
          <div className={classes.footer}>
            <Tabs
              value={currentTab}
              onChange={onChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
              TabIndicatorProps={{ className: classes.indicator }}
              className={classes.tabs}
            >
              {TAB_KEYS.map((key: string, index: number) => (
                <Tab
                  key={key}
                  label={t('tracker:' + key)}
                  value={index}
                  className={classes.tabItem}
                />
              ))}
            </Tabs>
          </div>
        </div>
      </MainLayout>
      <SelectTracker
        show={showSelectTracker}
        onClose={onCloseSelectTracker}
        trackers={trackers}
        selectedTrackerId={trackeId}
        t={t}
        onChangeTrackers={changeTrackersTracking}
        isHeatMap={viewMode === 'heat_map'}
        getHistoryTracker={getHistoryTracker}
      />
    </React.Fragment>
  );
}

import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Slide, Tabs, Tab, IconButton, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { FaMapMarkerAlt } from 'react-icons/fa';

import Map from '@Components/Maps';
import { Button } from '@Components/buttons';
import TopToolBar from '@Components/Maps/components/MapToolBarMobile/TopToolBar';
import BottomToolBar from '@Components/Maps/components/MapToolBarMobile/BottomToolBar';
import DetailTrackerCard from '@Components/DetailTrackerCard';

import SettingTracker from '@Containers/SingleTracker/components/SettingTracker';
import HistoryTracker from '@Containers/SingleTracker/components/HistoryTracker';
import ShareLocation from '@Containers/SingleTracker/components/ShareLocation';
import TrackerGeofences from '@Containers/Trackers/views/ViewMobile/TrackerGeofences';
import { TAB_KEYS } from '@Containers/Tracking/store/constants';
import useStyles from './styles';

interface Props {
  isMobile: boolean;
  viewMode: string;
  trackingIds: number[];
  trackers: object;
  t(key: string, format?: object): string;
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  [data: string]: any;
}

export default function ViewHomeMobile(props: Props) {
  const {
    trackers,
    trackingIds,
    t,
    changeTrackingView,
    changeTrackersTracking,
  } = props;
  const [showTracking, setShowTracking] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [currentView, setCurrentView] = useState('');
  const [currentTab, setTab] = useState(0);
  const classes = useStyles();

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    changeTrackingView(TAB_KEYS[newValue]);
  };

  const onCloseView = () => setCurrentView('');

  const handleClickViewHistory = () => {
    console.log('___view history');
    onCloseView();
  };

  const onCloseTracking = () => {
    setShowTracking(false);
  };

  const onClickSelectDevice = () => {
    console.log('___comming...');
  };

  useEffect(() => {
    if (isFirstLoading && !isEmpty(trackers)) {
      const [firsTrackerId] = isEmpty(trackingIds)
        ? Object.keys(trackers)
        : trackingIds;

      if (firsTrackerId) {
        const { lat, lng } = trackers[firsTrackerId];
        lat && lng && window.mapEvents.setCenter([lat, lng]);
        changeTrackersTracking([+firsTrackerId]);
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

  return (
    <Slide in={showTracking} direction="right" mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <IconButton onClick={onCloseTracking} className={classes.iconBack}>
              <ArrowBackIosIcon className={classes.icon} />
            </IconButton>
            <Typography className={classes.headerTitle}>Tracking</Typography>
          </div>
          <Button
            text={'Select device'}
            color="secondary"
            startIcon={<FaMapMarkerAlt className={classes.headerBtnIcon} />}
            onClick={onClickSelectDevice}
            className={`${classes.headerTitle} ${classes.headerBtn}`}
          />
        </div>
        <div className={classes.mapView}>
          <Map
            fullWidth={true}
            mapType="leaflet"
            isTracking={true}
            {...props}
          />
          {tracker && (
            <React.Fragment>
              <TopToolBar t={props.t} />
              <BottomToolBar
                t={props.t}
                tracker={tracker}
                isBeep={props.isBeep}
                resetBeep={props.resetBeep}
                onClickSendBeep={props.onClickSendBeep}
                showSnackbar={props.showSnackbar}
                onChangeView={setCurrentView}
              />
              <div className={classes.trackerCard}>
                <DetailTrackerCard
                  tracker={tracker}
                  isMobile={true}
                  t={props.t}
                />
              </div>
              <SettingTracker
                t={props.t}
                show={currentView === 'settingsView'}
                tracker={tracker}
                handleClose={onCloseView}
                isMobile={true}
              />
              <TrackerGeofences
                show={currentView === 'geofenceListView'}
                onClickBack={onCloseView}
                geofences={props.geofences}
                tracker={tracker}
                isMobile={true}
                t={props.t}
              />
              <HistoryTracker
                handleClose={onCloseView}
                t={props.t}
                show={currentView === 'historyView'}
                isMobile={true}
                onClickViewHistory={handleClickViewHistory}
              />
              <ShareLocation
                handleClose={onCloseView}
                t={props.t}
                show={currentView === 'shareLocationView'}
                isMobile={true}
              />
            </React.Fragment>
          )}
        </div>
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
    </Slide>
  );
}

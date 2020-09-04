/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash';
import Fade from '@material-ui/core/Fade';
import { SideBarInnerPC } from '@Components/sidebars';
import Map from '@Components/Maps';
import SingleTracker from '@Containers/SingleTracker';
import MapToolBars from '@Components/Maps/components/MapToolBar';
import Tabs from '../Tabs';
import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import {
  Container,
  MapView,
  ContainerAlert,
  ContentAlert,
  ButtonClear,
  IconSos,
  Content,
} from './styles';

export default function TrackersContainer(props: any) {
  const {
    onResetSelectedTrackerID,
    getSOSalertTracker,
    alerts,
    alertsIds,
    profile,
    trackerIds,
    ...rest
  } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);
  const [isAlertSos, setAlertSos] = useState(false);
  const toggleSideBar = () => {
    if (!isOpenSidebar) {
      if (rest.selectedTrackerId) {
        const { lat, lng } = rest.trackers[rest.selectedTrackerId];
        if (!!lat && !!lng) {
          window.mapEvents.setCenterFlyTo({ lat, lng }, { speed: 1, zoom: 15 });
        }
      } else if (!isEmpty(rest.trackers)) {
        const coords = Object.values(rest.trackers).filter(
          ({ lat, lng }: any) => !!lat && !!lng
        );
        if (coords.length > 0) {
          const options =
            window.mapType === 'leaflet' ? LEAFLET_PADDING_OPTIONS : {};
          window.mapEvents.setFitBounds(coords, !isOpenSidebar ? options : {});
        }
      }
    }
    setOpenSidebar(!isOpenSidebar);
  };

  const msToTime = function (duration: number) {
    let parseSeconds = parseInt((duration % 60).toString(), 10);
    let parseMinutes = parseInt(((duration / 60) % 60).toString(), 10);
    let parseHours = parseInt(((duration / (60 * 60)) % 24).toString(), 10);

    let hour = parseHours < 10 ? `0${parseHours}` : parseHours;
    let minute = parseMinutes < 10 ? `0${parseMinutes}` : parseMinutes;
    let second = parseSeconds < 10 ? `0${parseSeconds}` : parseSeconds;
    return `${hour}:${minute}:${second}`;
  };

  const sosTimer = useCallback((seconds: number, device) => {
    const smsTimer = msToTime(seconds);
    const elm = document.getElementById('time');
    if (elm) {
      elm.innerHTML = smsTimer;
    }
    const timeOut = setTimeout(() => {
      seconds++;
      sosTimer(seconds, device);
    }, 1000);
    if (!device.read) {
      return () => clearTimeout(timeOut);
    }
  }, []);

  useEffect(() => {
    window.mapFullWidth = false;
  }, []);

  useEffect(() => {
    if (profile && profile.id && trackerIds && trackerIds.length > 0) {
      getSOSalertTracker({
        alarm_types: 'SOS',
        device_ids: trackerIds.join(','),
        limit: 500,
        page: 1,
        read_status: '',
        sort_direction: 'DESC',
      });
    }
  }, [profile, trackerIds, getSOSalertTracker]);

  useEffect(() => {
    if (
      alertsIds &&
      alertsIds.length > 0 &&
      alerts[alertsIds[0]]?.alarm_type === 'SOS' &&
      alerts[alertsIds[0]]?.read === false
    ) {
      setAlertSos(true);
    }
  }, [alertsIds, alerts]);

  useEffect(() => {
    if (
      alertsIds &&
      alertsIds.length > 0 &&
      alerts[alertsIds[0]]?.alarm_type === 'SOS' &&
      alerts[alertsIds[0]]?.read === false
    ) {
      sosTimer(alerts[alertsIds[0]].age, alerts[alertsIds[0]]);
    }
  }, [alertsIds, alerts, sosTimer]);

  const openSideBar = () => setOpenSidebar(true);

  const handleClickBack = () => {
    onResetSelectedTrackerID();
    window.history.pushState({}, '', '/trackers');
    const obj = rest.trackers || {};
    const coords = Object.values(obj).filter(
      ({ lat, lng }: any) => !!lat && !!lng
    );
    if (coords.length > 0) {
      const options =
        window.mapType === 'leaflet' ? LEAFLET_PADDING_OPTIONS : {};
      window.mapEvents.setFitBounds(coords, isOpenSidebar ? options : {});
    }
  };

  const trackerAlerts = trackerIds?.filter(
    item => props.trackers[item].alerts?.length > 0
  );

  const trackerAlertSos = trackerAlerts?.filter(
    item => alerts[props.trackers[item]?.alerts[0]]?.read === false
  );

  const renderDetailAlertSos = () => {
    const { trackers, readSOSalert } = props;
    const onClearSosAlert = item => () => {
      readSOSalert({
        alertId: props.trackers[item]?.alerts[0],
        priority: 'NONE',
        read: true,
      });
      setAlertSos(false);
    };

    return (
      trackerAlertSos &&
      trackerAlertSos?.map(item => (
        <Fade in={isAlertSos} unmountOnExit mountOnEnter key={item}>
          <ContainerAlert>
            <IconSos src="/images/ic-alert-SOS.svg" />
            <ContentAlert>
              <div id="time"></div>
              <Content>
                {` ${trackers[item]?.device_name} SOS button pressed`}{' '}
              </Content>
            </ContentAlert>
            <ButtonClear onClick={onClearSosAlert(item)}>Clear</ButtonClear>
          </ContainerAlert>
        </Fade>
      ))
    );
  };
  return (
    <Container>
      <SideBarInnerPC opened={isOpenSidebar} onChange={toggleSideBar}>
        {rest.selectedTrackerId ? (
          <SingleTracker
            tracker={rest.trackers[rest.selectedTrackerId]}
            onClickBack={handleClickBack}
            t={rest.t}
          />
        ) : (
          <Tabs {...rest} trackerIds={trackerIds} />
        )}
      </SideBarInnerPC>
      <MapView>
        <Map
          mapType="leaflet"
          openSideBar={openSideBar}
          isAlertSos={isAlertSos}
          alertSosTrackerId={trackerAlertSos}
          {...rest}
        />
        <MapToolBars t={rest.t} />
        {isAlertSos ? renderDetailAlertSos() : null}
      </MapView>
    </Container>
  );
}

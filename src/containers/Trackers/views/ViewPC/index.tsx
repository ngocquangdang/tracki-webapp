import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import { SideBarInnerPC } from '@Components/sidebars';
import Map from '@Components/Maps';
import SingleTracker from '@Containers/SingleTracker';
import MapToolBars from '@Components/Maps/components/MapToolBar';
import Tabs from '../Tabs';
import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';

import { Container, MapView } from './styles';

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
      alerts[alertsIds[alertsIds.length - 1]]?.alarm_type === 'SOS'
    ) {
      setAlertSos(true);
    }
  }, [alertsIds, alerts]);

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
          {...rest}
        />
        <MapToolBars t={rest.t} />
      </MapView>
    </Container>
  );
}

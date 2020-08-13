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
  const { onResetSelectedTrackerID, ...rest } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);

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
          <Tabs {...rest} />
        )}
      </SideBarInnerPC>
      <MapView>
        <Map mapType="leaflet" openSideBar={openSideBar} {...rest} />
        <MapToolBars t={rest.t} />
      </MapView>
    </Container>
  );
}

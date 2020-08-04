import React, { useState } from 'react';
import { isEmpty } from 'lodash';

import { SideBarInnerPC } from '@Components/sidebars';
import Map from '@Components/Maps';
import SingleTracker from '@Containers/SingleTracker';
import MapToolBars from '@Components/Maps/components/MapToolBar';
import Tabs from '../Tabs';

import { Container, MapView } from './styles';

export default function TrackersContainer(props: any) {
  const { selectedTrackerId, onResetSelectedTrackerID, ...rest } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const toggleSideBar = () => {
    if (!isOpenSidebar) {
      if (selectedTrackerId) {
        const { lat, lng } = rest.trackers[selectedTrackerId];
        if (!!lat && !!lng) {
          window.mapEvents.setCenterFlyTo({ lat, lng }, { speed: 1, zoom: 15 });
        }
      } else if (!isEmpty(rest.trackers)) {
        const coords = Object.values(rest.trackers).filter(
          ({ lat, lng }: any) => !!lat && !!lng
        );
        if (coords.length > 0) {
          window.mapEvents.setFitBounds(coords);
          window.mapEvents.setPadding({ left: 340 });
        }
      }
    }
    setOpenSidebar(!isOpenSidebar);
  };

  const openSideBar = () => setOpenSidebar(true);

  const handleClickBack = () => {
    onResetSelectedTrackerID();
    const obj = rest.trackers || {};
    const coords = Object.values(obj).filter(
      ({ lat, lng }: any) => !!lat && !!lng
    );
    coords.length > 0 && window.mapEvents.setFitBounds(coords);
  };

  return (
    <Container>
      <SideBarInnerPC opened={isOpenSidebar} onChange={toggleSideBar}>
        {selectedTrackerId ? (
          <SingleTracker
            tracker={rest.trackers[selectedTrackerId]}
            onClickBack={handleClickBack}
            t={rest.t}
          />
        ) : (
          <Tabs {...rest} />
        )}
      </SideBarInnerPC>
      <MapView>
        <Map
          mapType="leaflet"
          fullWidth={!isOpenSidebar}
          openSideBar={openSideBar}
          {...rest}
        />
        <MapToolBars t={rest.t} />
      </MapView>
    </Container>
  );
}

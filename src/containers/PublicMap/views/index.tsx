import React from 'react';

import { Header, Container, Image } from './styles';
import Link from 'next/link';

import Map from '@Components/Maps';
import dynamic from 'next/dynamic';
import MapToolBarPC from '../MapCard/MapToolBarPC';
const MapCard = dynamic(() => import('@Containers/PublicMap/MapCard'), {
  ssr: false,
});

export default function PublicMapContainer(props) {
  const { trackers } = props;

  return (
    <>
      <Header>
        <Link href="/">
          <Image src={'/images/logo.png'} alt=""></Image>
        </Link>
      </Header>
      <Container>
        {trackers && Object.keys(trackers).length > 0 ? (
          <MapCard mapId="publicMap" mapType="leaflet" {...props} />
        ) : (
          <>
            <Map
              fullWidth={true}
              showTrackerName={true}
              mapType="leaflet"
              {...props}
            />
            <MapToolBarPC {...props} />
          </>
        )}
      </Container>
    </>
  );
}

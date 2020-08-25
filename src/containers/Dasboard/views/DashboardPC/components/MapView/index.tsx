import React from 'react';
import dynamic from 'next/dynamic';

import {
  MapViewCard,
  HeaderCard,
  useStyles,
  CardTitle,
  Description,
  ContentCard,
  MapView,
} from './styles';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import Map from '@Components/Maps';
import moment from 'moment';
import ToolBar from '@Containers/Dasboard/views/components/MapCard/MapToolBarPC';

const MapCard = dynamic(() =>
  import('@Containers/Dasboard/views/components/MapCard')
);

export default function MapViewComponent(props) {
  const classes = useStyles();
  const { trackerSelected, t, trackingIds } = props;

  return (
    <MapViewCard>
      <HeaderCard>
        <CardTitle>
          <div className={`${classes.color} ${classes.cellHeader}`}>
            <FaMapMarkerAlt className={classes.iconCard} />
            {t('dashboard:current_position')}
          </div>
        </CardTitle>
        <Description>
          <GoPrimitiveDot
            className={
              trackerSelected?.status === 'active'
                ? classes.primaryColor
                : classes.secondaryColor
            }
          />{' '}
          {t('dashboard:online')} | {t('dashboard:last_update')}
          {moment(trackerSelected?.time * 1000).format('lll')}
        </Description>
      </HeaderCard>
      <ContentCard>
        <MapView>
          <React.Fragment>
            <Map
              fullWidth={true}
              showTrackerName={true}
              mapType="leaflet"
              {...props}
            />
            <ToolBar {...props} />
          </React.Fragment>
          {trackingIds && trackingIds.length > 0 && (
            <>
              <MapCard
                mapId="isDashboard"
                selectedTrackerId={trackerSelected.device_id}
                mapType="leaflet"
                {...props}
              />
            </>
          )}
        </MapView>
      </ContentCard>
    </MapViewCard>
  );
}

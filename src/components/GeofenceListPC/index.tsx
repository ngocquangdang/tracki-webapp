import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import { SkeletonTracker } from '@Components/Skeletons';
import GeoFence from './components/GeoFenceCard';
import AddGeofencePanel from './components/AddGeoFence';
import { MAP_ACTIONS } from '@Components/Maps/constant';

import { changeMapAction } from '@Containers/App/store/actions';
import { makeSelectLoading } from '@Containers/App/store/selectors';
import {
  makeSelectGeofences,
  makeSelectGeofenceId,
  makeSelectGeofenceIds,
  makeSelectEditGeofenceId,
} from '@Containers/Trackers/store/selectors';
import {
  selectGeofenceIdAction,
  resetSelectedGeofenceAction,
  updateGeofenceRequestedAction,
  editGeofenceAction,
  removeGeofenceRequestAction,
  createGeofenceRequestAction,
} from '@Containers/Trackers/store/actions';

interface Props {
  geofenceIds: number[] | null;
  geofences: object;
  selectedGeofenceId: number;
  editGeofenceId: number;
  isRequesting: boolean;
  isMobile?: boolean;
  t(key: string, format?: object): string;
  selectGeofenceIdAction(id: number): void;
  updateGeofenceAction(id: number, data: object): void;
  editGeofenceAction(id: number | null): void;
  createGeofenceAction(geofence: object): void;
  removeGeofenceRequestAction(id: number): void;
  changeMapAction(mapAction: string): void;
  [data: string]: any;
}

function ListGeoFence(props: Props) {
  const {
    isMobile,
    geofenceIds,
    geofences,
    selectedGeofenceId,
    editGeofenceId,
    isRequesting,
    t,
    selectGeofenceIdAction,
    updateGeofenceAction,
    editGeofenceAction,
    createGeofenceAction,
    removeGeofenceRequestAction,
    changeMapAction,
  } = props;
  const classes = useStyles();
  const [showAddPanel, setShowPanel] = useState(false);

  const onClosePanel = () => {
    setShowPanel(false);
    editGeofenceAction(null);
  };

  const onOpenPanel = () => {
    setShowPanel(true);
    changeMapAction(MAP_ACTIONS.CREATE_RECTANGLE);
  };

  const editGeofence = (geoId: number) => {
    setShowPanel(true);
    editGeofenceAction(geoId);
  };

  return (
    <Container>
      <Content>
        <ListItem>
          {geofenceIds
            ? geofenceIds.map(id => (
                // eslint-disable-next-line react/jsx-indent
                <GeoFence
                  key={id}
                  geofence={geofences[id]}
                  t={t}
                  selectedGeofenceId={selectedGeofenceId}
                  selectGeofence={selectGeofenceIdAction}
                  updateGeofence={updateGeofenceAction}
                  editGeofence={editGeofence}
                  removeGeofence={removeGeofenceRequestAction}
                />
              ))
            : [1, 2].map(i => <SkeletonTracker key={i} />)}
        </ListItem>
      </Content>
      <Footer>
        <Button
          classes={classes.btn}
          text={t('tracker:add_a_geofence')}
          color="primary"
          type="submit"
          startIcon={<FiPlus />}
          onClick={onOpenPanel}
        />
      </Footer>
      <AddGeofencePanel
        show={showAddPanel}
        isMobile={isMobile}
        isRequesting={isRequesting}
        selectedGeofence={geofences[editGeofenceId]}
        t={t}
        handleClose={onClosePanel}
        changeMapAction={changeMapAction}
        updateGeofence={updateGeofenceAction}
        createGeofence={createGeofenceAction}
      />
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectLoading(),
  geofences: makeSelectGeofences(),
  geofenceIds: makeSelectGeofenceIds(),
  selectedGeofenceId: makeSelectGeofenceId(),
  editGeofenceId: makeSelectEditGeofenceId(),
});

const mapDispatchToProps = (dispatch: any) => ({
  editGeofenceAction: (id: number) => dispatch(editGeofenceAction(id)),
  removeGeofenceRequestAction: (id: number) =>
    dispatch(removeGeofenceRequestAction(id)),
  selectGeofenceIdAction: (id: number) => dispatch(selectGeofenceIdAction(id)),
  resetSelectedGeofenceAction: () => dispatch(resetSelectedGeofenceAction()),
  updateGeofenceAction: (geoId: number, data: object) =>
    dispatch(updateGeofenceRequestedAction(geoId, data)),
  createGeofenceAction: (geofence: object) =>
    dispatch(createGeofenceRequestAction(geofence)),
  changeMapAction: (mapAction: string) => dispatch(changeMapAction(mapAction)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ListGeoFence);

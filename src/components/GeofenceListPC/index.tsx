import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { uniqueId } from 'lodash';

import {
  Container,
  Content,
  Footer,
  ListItem,
  useStyles,
  Message,
} from './styles';
import { Button } from '@Components/buttons';
import { SkeletonTracker } from '@Components/Skeletons';
import GeoFence from './components/GeoFenceCard';
import AddGeofencePanel from './components/AddGeoFence';
import { MAP_ACTIONS } from '@Components/Maps/constant';
import { IGeofence } from '@Interfaces';

import { changeMapAction } from '@Containers/App/store/actions';
import { makeSelectLoading } from '@Containers/App/store/selectors';
import {
  makeSelectGeofences,
  makeSelectGeofenceId,
  makeSelectGeofenceIds,
  makeSelectEditGeofenceId,
  makeSelectNewGeofence,
} from '@Containers/Trackers/store/selectors';
import {
  selectGeofenceIdAction,
  resetSelectedGeofenceAction,
  saveGeofenceRequestedAction,
  editGeofenceAction,
  removeGeofenceRequestAction,
  createGeofenceRequestAction,
  createNewGeofence,
  updateNewGeofence,
  updateGeofence,
  resetNewGeofenceAction,
} from '@Containers/Trackers/store/actions';
import { GEOFENCE_DEFAULT } from './constant';
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Props {
  geofenceIds: number[] | null;
  geofences: object;
  selectedGeofenceId: number;
  editGeofenceId: number;
  isRequesting: boolean;
  isMobile?: boolean;
  newGeofence: IGeofence;
  t(key: string, format?: object): string;
  selectGeofenceIdAction(id: number): void;
  resetNewGeofenceAction(): void;
  saveGeofenceRequestAction(id: number, data: object): void;
  editGeofenceAction(id: number | null): void;
  createNewGeofenceRequestAction(geofence: object): void;
  createNewGeofence(geofence: object): void;
  updateNewGeofence(geofence: object): void;
  updateGeofence(geoId: number, data: object): void;
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
    newGeofence,
    t,
    createNewGeofence,
    updateGeofence,
    updateNewGeofence,
    selectGeofenceIdAction,
    saveGeofenceRequestAction,
    editGeofenceAction,
    createNewGeofenceRequestAction,
    removeGeofenceRequestAction,
    changeMapAction,
    resetNewGeofenceAction,
  } = props;
  const classes = useStyles();
  const [showAddPanel, setShowPanel] = useState(false);
  const [isSwitch, setSwitch] = useState(false);

  firebaseLogEventRequest('geofence_page', '');

  const onClosePanel = () => {
    setShowPanel(false);
    editGeofenceAction(null);
  };

  const onOpenPanel = () => {
    firebaseLogEventRequest('geofence_page', 'add_geofence');
    setShowPanel(true);
    createNewGeofence({ ...GEOFENCE_DEFAULT, id: uniqueId('new_geo_') });
    changeMapAction(MAP_ACTIONS.CREATE_RECTANGLE);
  };

  const editGeofence = (geoId: number) => {
    setShowPanel(true);
    editGeofenceAction(geoId);
  };

  const updateSwitch = () => {
    setSwitch(true);
  };

  return (
    <Container>
      <Content>
        <ListItem>
          {isRequesting && !isSwitch ? (
            [1, 2].map(i => <SkeletonTracker key={i} />)
          ) : geofenceIds && geofenceIds.length > 0 ? (
            geofenceIds.map(id => (
              // eslint-disable-next-line react/jsx-indent
              <GeoFence
                key={id}
                geofence={geofences[id]}
                t={t}
                updateSwitch={updateSwitch}
                selectedGeofenceId={selectedGeofenceId}
                selectGeofence={selectGeofenceIdAction}
                updateGeofence={saveGeofenceRequestAction}
                editGeofence={editGeofence}
                removeGeofence={removeGeofenceRequestAction}
              />
            ))
          ) : (
            <Message>{t('tracker:no_geofence_found')}</Message>
          )}
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
        newGeofence={newGeofence}
        t={t}
        handleClose={onClosePanel}
        updateNewGeofence={updateNewGeofence}
        updateGeofence={updateGeofence}
        changeMapAction={changeMapAction}
        resetNewGeofenceAction={resetNewGeofenceAction}
        saveGeofenceRequestAction={saveGeofenceRequestAction}
        createNewGeofenceRequestAction={createNewGeofenceRequestAction}
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
  newGeofence: makeSelectNewGeofence(),
});

const mapDispatchToProps = (dispatch: any) => ({
  editGeofenceAction: (id: number) => dispatch(editGeofenceAction(id)),
  removeGeofenceRequestAction: (id: number) =>
    dispatch(removeGeofenceRequestAction(id)),
  selectGeofenceIdAction: (id: number) => dispatch(selectGeofenceIdAction(id)),
  resetSelectedGeofenceAction: () => dispatch(resetSelectedGeofenceAction()),
  saveGeofenceRequestAction: (geoId: number, data: object) =>
    dispatch(saveGeofenceRequestedAction(geoId, data)),
  createNewGeofenceRequestAction: (geofence: object) =>
    dispatch(createGeofenceRequestAction(geofence)),
  changeMapAction: (mapAction: string) => dispatch(changeMapAction(mapAction)),
  createNewGeofence: (geo: object) => dispatch(createNewGeofence(geo)),
  updateNewGeofence: (geo: object) => dispatch(updateNewGeofence(geo)),
  resetNewGeofenceAction: () => dispatch(resetNewGeofenceAction()),
  updateGeofence: (id: number, data: object) =>
    dispatch(updateGeofence(id, data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ListGeoFence);

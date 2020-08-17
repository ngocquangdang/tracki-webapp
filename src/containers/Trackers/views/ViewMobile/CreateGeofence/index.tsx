import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Slide, IconButton } from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';
import dynamic from 'next/dynamic';

import { HeaderSecondary } from '@Layouts';
import GeofenceCard from '../GeofenceCard';
import { changeMapAction } from '@Containers/App/store/actions';
import { makeSelectLoading } from '@Containers/App/store/selectors';
import {
  makeSelectTrackers,
  makeSelectTrackerId,
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
import { IGeofence } from '@Interfaces';
import { useStyles } from './styles';

const GeofenceMap = dynamic(() => import('../GeofenceMap'), { ssr: false });

interface Props {
  show: boolean;
  geofences: object;
  trackers: object;
  isRequesting: boolean;
  selectedTrackerId: number;
  newGeofence: IGeofence;
  onClose: () => void;
  t(key: string, format?: object): string;
  changeMapAction(mapAction: string): void;
  changeMapAction(action: string): void;
  resetNewGeofenceAction(): void;
  updateNewGeofence(data: object): void;
  updateGeofence(id: number, data: object): void;
  saveGeofenceRequestAction(id: number, data: object): void;
  createNewGeofenceRequestAction(geofence: object): void;
  [data: string]: any;
}

function CreateGeofenceMobile(props: Props) {
  const classes = useStyles();
  const {
    show,
    geofences,
    editGeofenceId,
    isRequesting,
    newGeofence,
    trackers,
    selectedTrackerId,
    t,
    onClose,
    updateGeofence,
    updateNewGeofence,
    saveGeofenceRequestAction,
    createNewGeofenceRequestAction,
    changeMapAction,
    resetNewGeofenceAction,
  } = props;
  const selectedGeofence = geofences[editGeofenceId];
  const [cloneSelectedGeofence, setCloneGeofence] = useState(selectedGeofence);

  useEffect(() => {
    if (!cloneSelectedGeofence) {
      setCloneGeofence(selectedGeofence);
    }
  }, [selectedGeofence, cloneSelectedGeofence]);

  const onSaveFromHeader = () => {
    document.getElementById('createGeoMobileBtn')?.click();
  };

  const onSaveRequest = (values: any) => {
    selectedGeofence
      ? saveGeofenceRequestAction(selectedGeofence.id, values)
      : createNewGeofenceRequestAction({ ...newGeofence, name: values.name });
    changeMapAction('DEFAULT');
    onClose();
  };

  const removeGeofence = (id: number) => {
    if (window.geosDrawn[id]) {
      window.mapEvents.map.mapApi.removeLayer(window.geosDrawn[id]);
      delete window.geosDrawn[id];
    }
  };

  const onCloseCreateGeofence = () => {
    if (newGeofence) {
      removeGeofence(newGeofence.id);
    }
    if (cloneSelectedGeofence) {
      removeGeofence(cloneSelectedGeofence.id);
      updateGeofence(cloneSelectedGeofence.id, cloneSelectedGeofence);
    }
    resetNewGeofenceAction();
    changeMapAction('DEFAULT');
    onClose();
  };

  return (
    <React.Fragment>
      <Slide direction="left" in={show} mountOnEnter unmountOnExit>
        <div className={classes.container}>
          <HeaderSecondary
            title={t('tracker:add_geofence')}
            onLeftClick={onCloseCreateGeofence}
            rightElement={
              <IconButton
                onClick={onSaveFromHeader}
                className={classes.iconBtn}
              >
                <DoneIcon className={classes.iconBack} />
              </IconButton>
            }
          />
          <div className={classes.content}>
            <GeofenceMap
              tracker={trackers[selectedTrackerId]}
              t={t}
              mapId="geofenceMap"
            />
          </div>
          <div className={classes.geofenceCard}>
            <GeofenceCard
              isRequesting={isRequesting}
              selectedGeofence={selectedGeofence}
              newGeofence={newGeofence}
              t={t}
              onSaveRequest={onSaveRequest}
              updateNewGeofence={updateNewGeofence}
              updateGeofence={updateGeofence}
              changeMapAction={changeMapAction}
            />
          </div>
        </div>
      </Slide>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectLoading(),
  geofences: makeSelectGeofences(),
  geofenceIds: makeSelectGeofenceIds(),
  selectedGeofenceId: makeSelectGeofenceId(),
  editGeofenceId: makeSelectEditGeofenceId(),
  newGeofence: makeSelectNewGeofence(),
  selectedTrackerId: makeSelectTrackerId(),
  trackers: makeSelectTrackers(),
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

export default withConnect(CreateGeofenceMobile);

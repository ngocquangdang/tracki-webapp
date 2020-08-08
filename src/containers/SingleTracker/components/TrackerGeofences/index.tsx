import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Slide, Tabs, Tab, Typography } from '@material-ui/core';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import LinkGeofence from '@Components/LinkGeoFenceCard';
import AddGeoFence from '@Components/GeofenceListPC/components/AddGeoFence';
import SelectContact from '../SelectContact';
import { GEOFENCE_DEFAULT } from '@Components/GeofenceListPC/constant';
import { MAP_ACTIONS } from '@Components/Maps/constant';
import { Button } from '@Components/buttons';
import TabPanel from './TabPanel';
import { ITracker } from '@Interfaces';
import {
  linkTrackersRequestAction,
  unlinkTrackersRequestAction,
  resetSelectedGeofenceAction,
  saveGeofenceRequestedAction,
  editGeofenceAction,
  removeGeofenceRequestAction,
  updateGeofence,
  createNewGeofence,
  updateNewGeofence,
  createGeofenceRequestAction,
  resetNewGeofenceAction,
} from '@Containers/Trackers/store/actions';
import { getContactListRequestAction } from '@Containers/SingleTracker/store/actions';
import { useStyles } from './styles';

import { changeMapAction } from '@Containers/App/store/actions';
import { makeSelectLoading } from '@Containers/App/store/selectors';
import {
  makeSelectGeofenceIds,
  makeSelectEditGeofenceId,
  makeSelectNewGeofence,
  makeSelectContactList,
} from '@Containers/Trackers/store/selectors';
import { IGeofence } from '@Interfaces';

interface Props {
  tracker: ITracker;
  fences?: object;
  contacts: object;
  geofences: object;
  editGeofenceId: number;
  show: boolean;
  isRequesting: boolean;
  isMobile: boolean;
  newGeofence: IGeofence;
  onClickBack: () => void;
  t(key: string, format?: object): string;
  unlinkTrackerAction(id: number, trackerIds: number[]): void;
  linkTrackerAction(id: number, trackerIds: number[]): void;
  resetNewGeofenceAction(): void;
  saveGeofenceRequestAction(id: number, data: object): void;
  editGeofenceAction(id: number | null): void;
  createNewGeofenceRequestAction(geofence: object): void;
  createNewGeofence(geofence: object): void;
  updateNewGeofence(geofence: object): void;
  updateGeofence(geoId: number, data: object): void;
  removeGeofenceRequestAction(id: number): void;
  changeMapAction(mapAction: string): void;
  getContactListRequestAction(): void;
  [data: string]: any;
}

function SingleTrackerGeofences(props: Props) {
  const classes = useStyles();
  const {
    show,
    tracker,
    geofences,
    isRequesting,
    isMobile,
    editGeofenceId,
    newGeofence,
    contacts,
    t,
    onClickBack,
    updateGeofence,
    updateNewGeofence,
    saveGeofenceRequestAction,
    editGeofenceAction,
    createNewGeofenceRequestAction,
    removeGeofenceRequestAction,
    changeMapAction,
    createNewGeofence,
    resetNewGeofenceAction,
    linkTrackerAction,
    unlinkTrackerAction,
    getContactListRequestAction,
  } = props;

  const [currentTab, setCurrentTab] = useState(0);
  const [showAddGefeoncePanel, setShowAddGeofencePanel] = useState(false);
  const [showSelectContactPanel, setShowSelectContactPanel] = useState(false);

  const onAddFence = () => {
    setShowAddGeofencePanel(true);
    createNewGeofence({ ...GEOFENCE_DEFAULT, id: uniqueId('new_geo_') });
    changeMapAction(MAP_ACTIONS.CREATE_RECTANGLE);
  };

  const onChangeTab = (event: any, newValue: any) => {
    setCurrentTab(newValue);
  };

  const unlinkTrackers = (geoId: number) => {
    unlinkTrackerAction(geoId, [tracker.device_id]);
  };

  const linkTrackers = (geoId: number) => {
    linkTrackerAction(geoId, [tracker.device_id]);
  };

  const onClosePanel = () => {
    setShowAddGeofencePanel(false);
    editGeofenceAction(null);
    setShowSelectContactPanel(false);
  };

  const editGeofence = (geoId: number) => {
    setShowAddGeofencePanel(true);
    editGeofenceAction(geoId);
  };

  const onAddContact = () => {
    getContactListRequestAction();
    setShowSelectContactPanel(true);
  };

  const geofenceNotLinkedByTracker = Object.keys(geofences).filter(
    id => !(tracker.geozones || []).includes(+id)
  );

  return (
    <Slide direction="right" in={show} mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={classes.header}>
          <Button
            text="Back"
            onClick={onClickBack}
            className={clsx(classes.headBtn, classes.backBtn)}
            startIcon={<ArrowBackIosIcon className={classes.iconBack} />}
          />
          <Button
            text="Fence"
            color="primary"
            variant="outlined"
            className={clsx(classes.headBtn)}
            onClick={onAddFence}
            startIcon={<AddIcon className={classes.iconBack} />}
          />
        </div>
        <div className={classes.content}>
          <Tabs
            value={currentTab}
            onChange={onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.tabs}
          >
            <Tab label="Linked-Fence" value={0} className={classes.tabItem} />
            <Tab
              label="Un-Linked Fence"
              value={1}
              className={classes.tabItem}
            />
          </Tabs>
          <TabPanel value={currentTab} index={0} className={classes.tabPanel}>
            <Typography className={classes.title}>
              {t('tracker:geofence_linked_to', { name: tracker.device_name })}
              <IoIosHelpCircleOutline className={classes.helpIcon} />
            </Typography>
            <div className={classes.geoList}>
              {(tracker.geozones || []).map(id => (
                <LinkGeofence
                  key={id}
                  t={t}
                  isLinked={true}
                  isMobile={isMobile}
                  geofence={geofences[id]}
                  addContact={onAddContact}
                  unLinkGeofence={unlinkTrackers}
                  editGeofence={editGeofence}
                  removeGeofence={removeGeofenceRequestAction}
                />
              ))}
            </div>
            <Typography className={classes.subtitle}>
              {t('tracker:link_fence_description')}
            </Typography>
          </TabPanel>
          <TabPanel value={currentTab} index={1} className={classes.tabPanel}>
            <Typography className={classes.title}>
              {t('tracker:unlinked_geofence')}
              <IoIosHelpCircleOutline className={classes.helpIcon} />
            </Typography>
            <div className={classes.geoList}>
              {geofenceNotLinkedByTracker.map(id => (
                <LinkGeofence
                  key={id}
                  t={t}
                  isMobile={isMobile}
                  geofence={geofences[id]}
                  addContact={(id: number) => {
                    console.log('addContact:::::', id);
                  }}
                  isLinked={false}
                  linkGeofence={linkTrackers}
                  editGeofence={editGeofence}
                  removeGeofence={removeGeofenceRequestAction}
                />
              ))}
            </div>
            <Typography className={classes.subtitle}>
              {t('tracker:unlinked_geofence_description')}
            </Typography>
          </TabPanel>
        </div>
        <AddGeoFence
          show={showAddGefeoncePanel}
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
        <SelectContact
          isMobile={isMobile}
          show={showSelectContactPanel}
          contacts={contacts}
          handleClose={onClosePanel}
          selectedContacts={tracker.contacts}
        />
      </div>
    </Slide>
  );
}

const mapDispatchToProps = dispatch => ({
  unlinkTrackerAction: (geoId: number, trackerIds: number[]) =>
    dispatch(unlinkTrackersRequestAction(geoId, trackerIds)),
  linkTrackerAction: (geoId: number, trackerIds: number[]) =>
    dispatch(linkTrackersRequestAction(geoId, trackerIds)),
  editGeofenceAction: (id: number) => dispatch(editGeofenceAction(id)),
  removeGeofenceRequestAction: (id: number) =>
    dispatch(removeGeofenceRequestAction(id)),
  resetSelectedGeofenceAction: () => dispatch(resetSelectedGeofenceAction()),
  saveGeofenceRequestAction: (geoId: number, data: object) =>
    dispatch(saveGeofenceRequestedAction(geoId, data)),
  changeMapAction: (mapAction: string) => dispatch(changeMapAction(mapAction)),
  updateGeofence: (id: number, data: object) =>
    dispatch(updateGeofence(id, data)),
  createNewGeofence: (geo: object) => dispatch(createNewGeofence(geo)),
  createNewGeofenceRequestAction: (geofence: object) =>
    dispatch(createGeofenceRequestAction(geofence)),
  updateNewGeofence: (geo: object) => dispatch(updateNewGeofence(geo)),
  resetNewGeofenceAction: () => dispatch(resetNewGeofenceAction()),
  getContactListRequestAction: () => dispatch(getContactListRequestAction()),
});

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectLoading(),
  geofenceIds: makeSelectGeofenceIds(),
  editGeofenceId: makeSelectEditGeofenceId(),
  newGeofence: makeSelectNewGeofence(),
  contacts: makeSelectContactList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SingleTrackerGeofences);

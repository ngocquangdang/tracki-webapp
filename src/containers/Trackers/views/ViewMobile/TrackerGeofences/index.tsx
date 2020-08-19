import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Slide, Tabs, Tab, Typography, IconButton } from '@material-ui/core';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import LinkGeofence from '@Components/LinkGeoFenceCard';
import { GEOFENCE_DEFAULT } from '@Components/GeofenceListPC/constant';
import { MAP_ACTIONS } from '@Components/Maps/constant';
import { Button } from '@Components/buttons';
import TabPanel from '@Components/TabPanel';
import { ITracker } from '@Interfaces';
import {
  linkTrackersRequestAction,
  unlinkTrackersRequestAction,
  editGeofenceAction,
  removeGeofenceRequestAction,
  createNewGeofence,
} from '@Containers/Trackers/store/actions';
import {
  // getContactListRequestAction,
  addContactRequestAction,
  removeContactAssignedRequestedAction,
  searchContactRequestedAction,
  addContactAssignedRequestedAction,
} from '@Containers/SingleTracker/store/actions';
import {
  makeSelectcontactAssigneds,
  makeSelectcontactAssignedIds,
} from '@Containers/Trackers/store/selectors';
import { makeSelectErrors } from '@Containers/AddTracker/store/selectors';

import { changeMapAction } from '@Containers/App/store/actions';

import { useStyles } from './styles';
// import SelectContact from '@Containers/SingleTracker/components/SelectContact';
import ContactList from '../ContactList';
import {
  makeSelectContacts,
  makeSelectContactIds,
} from '@Containers/Contacts/store/selector';

interface Props {
  tracker: ITracker;
  geofences: object;
  show: boolean;
  isMobile: boolean;
  onClickBack: () => void;
  t(key: string, format?: object): string;
  unlinkTrackerAction(id: number, trackerIds: number[]): void;
  linkTrackerAction(id: number, trackerIds: number[]): void;
  editGeofenceAction(id: number | null): void;
  createNewGeofence(geofence: object): void;
  removeGeofenceRequestAction(id: number): void;
  changeMapAction(mapAction: string): void;
  getContactListRequestAction(account_id: number): void;
  [data: string]: any;
  removeContactRequest(data, eventType): void;
  addContactPageRequest(data, callback): void;
  contactAssigneds?: object;
  contactAssignedIds?: Array<number>;
  searchContactRequest(v): void;
  errors: any;
  profile: any;
}

function TrackerGeofencesMobile(props: Props) {
  const classes = useStyles();
  const {
    show,
    tracker,
    geofences,
    isMobile,
    t,
    onClickBack,
    editGeofenceAction,
    removeGeofenceRequestAction,
    changeMapAction,
    createNewGeofence,
    linkTrackerAction,
    unlinkTrackerAction,
    getContactListRequestAction,
    contacts,
    contactIds,
    addContactPageRequest,
    addContactRequest,
    removeContactRequest,
    searchContactRequest,
    contactAssigneds,
    contactAssignedIds,
    errors,
    profile,
  } = props;

  const [currentTab, setCurrentTab] = useState(0);
  const [showContactList, setShowContactList] = useState(false);

  const onAddFence = () => {
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

  const editGeofence = (geoId: number) => {
    editGeofenceAction(geoId);
  };

  const onAddContact = (trackerId: number) => {
    setShowContactList(true);
    getContactListRequestAction(profile.account_id);
  };

  const onCloseContactList = () => {
    setShowContactList(false);
  };

  const geofenceNotLinkedByTracker = Object.keys(geofences).filter(
    id => !(tracker.geozones || []).includes(+id)
  );

  return (
    <React.Fragment>
      <Slide direction="right" in={show} mountOnEnter unmountOnExit>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <IconButton onClick={onClickBack} className={classes.iconBtn}>
                <ArrowBackIosIcon className={classes.iconBack} />
              </IconButton>
              <div className={classes.imgWrap}>
                <img
                  src={tracker.icon_url || '/images/tracki-device.png'}
                  alt=""
                />
              </div>
              <Typography className={classes.textBtn}>
                {tracker.device_name}
              </Typography>
            </div>
            <Button
              text="Fence"
              color="secondary"
              className={clsx(classes.headBtn, classes.addBtn)}
              onClick={onAddFence}
              startIcon={<AddIcon className={classes.iconAdd} />}
            />
          </div>
          <div className={classes.content}>
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
                    addContact={onAddContact}
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
          <Tabs
            value={currentTab}
            onChange={onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.tabs}
            TabIndicatorProps={{ className: classes.indicator }}
          >
            <Tab
              fullWidth
              label="Linked Fence"
              value={0}
              className={classes.tabItem}
            />
            <Tab
              fullWidth
              label="Un-Linked Fence"
              value={1}
              className={classes.tabItem}
            />
          </Tabs>
        </div>
      </Slide>
      <ContactList
        handleClose={onCloseContactList}
        show={showContactList}
        isMobile={isMobile}
        contacts={contacts}
        contactIds={contactIds}
        onSearch={searchContactRequest}
        t={t}
        contactAssigneds={contactAssigneds}
        contactAssignedIds={contactAssignedIds}
        addContactRequest={addContactRequest}
        removeContactRequest={removeContactRequest}
        addContactPageRequest={addContactPageRequest}
        tracker={tracker}
        errors={errors}
      />
    </React.Fragment>
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
  changeMapAction: (mapAction: string) => dispatch(changeMapAction(mapAction)),
  createNewGeofence: (geo: object) => dispatch(createNewGeofence(geo)),
  // getContactListRequestAction: (account_id: number) =>
  //   dispatch(getContactListRequestAction(account_id)),
  addContactPageRequest: (data, callback) =>
    dispatch(addContactRequestAction(data, callback)),
  addContactRequest: (data, eventType) =>
    dispatch(addContactAssignedRequestedAction(data, eventType)),
  removeContactRequest: (data, eventType) =>
    dispatch(removeContactAssignedRequestedAction(data, eventType)),
  searchContactRequest: v => dispatch(searchContactRequestedAction(v)),
});

const mapStateToProps = createStructuredSelector({
  contacts: makeSelectContacts(),
  contactIds: makeSelectContactIds(),
  contactAssigneds: makeSelectcontactAssigneds(),
  contactAssignedIds: makeSelectcontactAssignedIds(),
  errors: makeSelectErrors(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TrackerGeofencesMobile);

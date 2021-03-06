import * as types from '../constants';

export const fetchTrackersRequestedAction = (accountId: number) => ({
  type: types.GET_TRACKERS_REQUESTED,
  payload: { accountId },
});

export const fetchTrackersSucceedAction = (tracker: object) => {
  return {
    type: types.GET_TRACKERS_SUCCEED,
    payload: { tracker },
  };
};

export const fetchTrackersFailedAction = (error: object) => ({
  type: types.GET_TRACKERS_FAILED,
  payload: { error },
});

export const saveGeofenceRequestedAction = (geoId: number, data: object) => ({
  type: types.SAVE_GEOFENCE_REQUESTED,
  payload: { geoId, data },
});

export const saveGeofenceSucceedAction = (geoId: number, data: object) => {
  return {
    type: types.SAVE_GEOFENCE_SUCCEED,
    payload: { geoId, data },
  };
};

export const saveGeofenceFailedAction = (error: object) => ({
  type: types.SAVE_GEOFENCE_FAILED,
  payload: { error },
});

export const fetchGeofencesRequestedAction = (accountId: number) => ({
  type: types.GET_GEOFENCES_REQUESTED,
  payload: { accountId },
});

export const fetchGeofencesSucceedAction = (geofence: object) => {
  return {
    type: types.GET_GEOFENCES_SUCCEED,
    payload: { geofence },
  };
};

export const fetchGeofencesFailedAction = (error: object) => ({
  type: types.GET_GEOFENCES_FAILED,
  payload: { error },
});

export const searchTrackersRequestedAction = (search: string | null) => ({
  type: types.SEARCH_TRACKERS_REQUESTED,
  payload: { search },
});

export const searchTrackersSucceedAction = (
  trackerIds: Array<number | string>
) => ({
  type: types.SEARCH_TRACKERS_SUCCEED,
  payload: { trackerIds },
});

export const searchTrackersFailedAction = (error: object) => ({
  type: types.SEARCH_TRACKERS_FAILED,
  payload: { error },
});

export const searchGeofencesRequestedAction = (search: string | null) => ({
  type: types.SEARCH_GEOFENCES_REQUESTED,
  payload: { search },
});

export const searchGeofencesSucceedAction = (
  geofenceIds: Array<number | string>
) => ({
  type: types.SEARCH_GEOFENCES_SUCCEED,
  payload: { geofenceIds },
});

export const searchGeofencesFailedAction = (error: object) => ({
  type: types.SEARCH_GEOFENCES_FAILED,
  payload: { error },
});

export const selectTrackerIdAction = (
  selectedTrackerId: number,
  subAccountId: number | null
) => ({
  type: types.SELECTED_TRACKER,
  payload: { selectedTrackerId, subAccountId },
});

export const resetSelectedTrackerIdAction = () => ({
  type: types.RESET_SELECTED_TRACKER,
});

export const resetNewGeofenceAction = () => ({
  type: types.RESET_NEW_GEOFENCE,
});

export const selectGeofenceIdAction = (geofenceId: number) => ({
  type: types.SELECTED_GEOFENCE,
  payload: { geofenceId },
});

export const createGeofenceRequestAction = (geofence: object) => ({
  type: types.CREATE_GEOFENCE_REQUESTED,
  payload: { geofence },
});

export const createGeofenceSuccessAction = () => ({
  type: types.CREATE_GEOFENCE_SUCCEED,
});

export const createGeofenceFailAction = (error: object) => ({
  type: types.CREATE_GEOFENCE_FAILED,
  payload: { error },
});

export const removeGeofenceRequestAction = (geofenceId: number) => ({
  type: types.REMOVE_GEOFENCE_REQUESTED,
  payload: { geofenceId },
});

export const removeGeofenceSuccessAction = (geofenceId: number) => ({
  type: types.REMOVE_GEOFENCE_SUCCEED,
  payload: { geofenceId },
});

export const removeGeofenceFailAction = (error: object) => ({
  type: types.REMOVE_GEOFENCE_FAILED,
  payload: { error },
});

export const editGeofenceAction = (geofenceId: number) => ({
  type: types.EDIT_GEOFENCE,
  payload: { geofenceId },
});

export const resetSelectedGeofenceAction = () => ({
  type: types.RESET_SELECTED_GEOFENCE,
});

export const linkTrackersRequestAction = (
  geofenceId: number,
  trackerIds: number[]
) => ({
  type: types.LINK_TRACKERS_REQUESTED,
  payload: { geofenceId, trackerIds },
});

export const linkTrackersSuccessAction = (
  geofenceId: number,
  trackerIds: number[]
) => ({
  type: types.LINK_TRACKERS_SUCCEED,
  payload: { geofenceId, trackerIds },
});

export const linkTrackersFailAction = (error: object) => ({
  type: types.LINK_TRACKERS_FAILED,
  payload: { error },
});

export const unlinkTrackersRequestAction = (
  geofenceId: number,
  trackerIds: number[]
) => ({
  type: types.UNLINK_TRACKERS_REQUESTED,
  payload: { geofenceId, trackerIds },
});

export const unlinkTrackersSuccessAction = (
  geofenceId: number,
  trackerIds: number[]
) => ({
  type: types.UNLINK_TRACKERS_SUCCEED,
  payload: { geofenceId, trackerIds },
});

export const unlinkTrackersFailAction = (error: object) => ({
  type: types.UNLINK_TRACKERS_FAILED,
  payload: { error },
});

export const createNewGeofence = (geofence: object) => ({
  type: types.CREATE_NEW_GEOFENCE,
  payload: { geofence },
});

export const updateNewGeofence = (geofence: object) => ({
  type: types.UPDATE_NEW_GEOFENCE,
  payload: { geofence },
});

export const updateGeofence = (geoId: number, geofence: object) => ({
  type: types.UPDATE_GEOFENCE,
  payload: { geoId, geofence },
});

export const updateTrackersUnlinkGeofence = (trackers: object) => ({
  type: types.UPDATE_TRACKERS_UNLINK_GEOFENCE,
  payload: { trackers },
});

export const updateTrackersLinkedGeofence = (trackers: object) => ({
  type: types.UPDATE_TRACKERS_LINKED_GEOFENCE,
  payload: { trackers },
});

export const refreshLocationRequestAction = (data: object) => ({
  type: types.REFRESH_LOACTION_REQUESTED,
  payload: { data },
});

export const getDeviceSubscripttionRequestedAction = (data: object) => ({
  type: types.GET_DEVICE_SUBSCRIPTION_REQUESTED,
  payload: { data },
});

export const getDeviceSubscripttionSucceedAction = (data: object) => {
  return {
    type: types.GET_DEVICE_SUBSCRIPTION_SUCCEED,
    payload: { data },
  };
};

export const getDeviceSubscripttionFailedAction = (error: object) => ({
  type: types.GET_DEVICE_SUBSCRIPTION_FAILED,
  payload: { error },
});

export const getDeviceSMSCounterRequestedAction = (device_id: number) => ({
  type: types.GET_SMS_COUNTER_REQUESTED,
  payload: { device_id },
});

export const getDeviceSMSCounterSucceedAction = (data: object) => {
  return {
    type: types.GET_SMS_COUNTER_SUCCEED,
    payload: { data },
  };
};

export const getDeviceSMSCounterFailedAction = (error: object) => ({
  type: types.GET_SMS_COUNTER_FAILED,
  payload: { error },
});

export const mqttUpdateTrackerAction = (tracker: object) => ({
  type: types.MQTT_UPDATE_TRACKER,
  payload: { tracker },
});

export const mqttUpdateTrackerSuccessAction = (tracker: object) => ({
  type: types.MQTT_UPDATE_TRACKER_SUCCESS,
  payload: { tracker },
});

export const getSOSalertTrackerRequestAction = (data: object) => ({
  type: types.GET_SOS_ALERT_TRACKER_REQUESTED,
  payload: { data },
});

export const getSOSalertTrackerSucceed = ({ alert, newTrackers }) => ({
  type: types.GET_SOS_ALERT_TRACKER_SUCCEED,
  payload: { alert, newTrackers },
});

export const getSOSalertTrackerFailed = (error: object) => ({
  type: types.GET_SOS_ALERT_TRACKER_FAILED,
  payload: { error },
});

export const readSOSalertRequestAction = (data: object) => ({
  type: types.READ_SOS_ALERT_TRACKER_REQUESTED,
  payload: { data },
});
export const readSOSalertSucceed = (data: object) => ({
  type: types.READ_SOS_ALERT_TRACKER_SUCCEED,
  payload: { data },
});
export const readSOSalertFailed = (error: object) => ({
  type: types.READ_SOS_ALERT_TRACKER_FAILED,
  payload: { error },
});

export const assignmentSubAccountRequestedAction = (
  accountId: number,
  trackerIds: number[],
  callback: () => void
) => ({
  type: types.ASSIGNMENT_TRACKER_SUB_ACCOUNT_REQUESTED,
  payload: { accountId, trackerIds, callback },
});

export const assignmentSubAccountSucceedAction = (setting: object) => {
  return {
    type: types.ASSIGNMENT_TRACKER_SUB_ACCOUNT_SUCCEED,
    payload: { setting },
  };
};

export const assignmentSubAccountFailedAction = (error: object) => ({
  type: types.ASSIGNMENT_TRACKER_SUB_ACCOUNT_FAILED,
  payload: { error },
});

export const getFullDeviceDetailSucceedAction = (setting: object) => {
  return {
    type: types.GET_FULL_DEVICE_DETAIL_SUCCEED,
    payload: { setting },
  };
};

export const getFullDeviceDetailFailedAction = (error: object) => ({
  type: types.GET_FULL_DEVICE_DETAIL_FAILED,
  payload: { error },
});

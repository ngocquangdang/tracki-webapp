import * as types from '../constants';

export const getHistoryTrackerRequest = (data: object) => {
  console.log('getHistoryTrackerRequest -> data', data);
  return {
    type: types.GET_HISTORY_TRACKER_REQUESTED,
    payload: { data },
  };
};

export const getHistoryTrackerSucceed = (data: any) => ({
  type: types.GET_HISTORY_TRACKER_SUCCEED,
  payload: { trackerId: data.trackerId, histories: data.histories },
});

export const getHistoryTrackerFailed = (error: object) => ({
  type: types.GET_HISTORY_TRACKER_FAILED,
  payload: { error },
});

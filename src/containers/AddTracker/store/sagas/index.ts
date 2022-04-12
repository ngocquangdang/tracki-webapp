import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from '@Interfaces';
import * as apiServices from '../../services';
import * as types from '../constants';

import {
  checkDeviceAssignedSuccesAction,
  checkDeviceAssignedFailAction,
  getDevicePlanSuccesAction,
  getDevicePlanFailAction,
  addDeviceFailAction,
  addDeviceSuccesAction,
  braintreeDropInFailAction,
  updateStore,
  braintreeDropInSuccesAction,
  newChannelSaleSuccesAction,
  newChannelSaleFailAction,
  newChannelSaleRequestAction,
  updateChannelSaleSuccesAction,
  updateChannelSaleFailAction,
  updateChannelSaleRequestAction,
} from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { fetchTrackersRequestedAction } from '@Containers/Trackers/store/actions';

function* checkDeviceAssignedSaga(action: ActionType) {
  const { data, callback } = action.payload;
  try {
    const res = yield call(apiServices.checkDeviceAssigned, data);
    if (res.data.assigned === 'false') {
      const payload = {
        device_id: data.device_id,
        channel_name: 'AMAZON',
        order_id: '0',
        last_4_digit_imei: data.imei,
      };
      yield put(newChannelSaleRequestAction(payload));
      yield put(checkDeviceAssignedSuccesAction(res.data));
      yield callback(true);
      return;
    }
    if (res.data.assigned === 'true') {
      yield callback(false);
      yield put(checkDeviceAssignedSuccesAction(res.data));
      return;
    }
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield callback(false);
    yield put(checkDeviceAssignedFailAction(payload));
  }
}

const groupPlans = (plans = [] as any) => {
  return plans.reduce(
    (group, plan) => {
      const key = plan.name.split(' ');
      const groupName = key[0].concat(' ', key[1]);
      group.groupNames = {
        ...group.groupNames,
        ...(group.groupNames[groupName]
          ? {
              [groupName]: {
                ids: group.groupNames[groupName].ids.concat(plan.id),
                name: groupName,
              },
            }
          : {
              [groupName]: {
                ids: [plan.id],
                name: groupName,
              },
            }),
      };
      group.plans = {
        ...group.plans,
        [plan.id]: plan,
      };

      return group;
    },
    {
      groupNames: {},
      plans: {},
    }
  );
};

function* getDevicePlanSaga(action: ActionType) {
  try {
    const account_id = yield call(apiServices.getUserInfo);
    const { data } = yield call(apiServices.getTrackerPlan, action.payload);
    let formatPlans;
    if (data.id === 90) {
      formatPlans = {
        ...groupPlans(data.planDTOList),
        id: data.id,
      };
    } else {
      formatPlans = data.planDTOList.reduce(
        (obj, item) => {
          obj.plans = { ...obj.plans, [item.id]: item };
          obj.planIds.push(item.id);
          return obj;
        },
        {
          planIds: [],
          plans: {},
          id: data.id,
        }
      );
    }
    yield put(
      getDevicePlanSuccesAction(formatPlans, account_id.data?.account_id)
    );
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(getDevicePlanFailAction(payload));
  }
}

function requestPaymentMethod(dropIn) {
  return new Promise((reslove, reject) => {
    dropIn
      .requestPaymentMethod()
      .then(payload => {
        reslove(payload);
      })
      .catch(error => reject(error));
  });
}

function* braintreeDropinSaga(action: ActionType) {
  const { formData, callback, setDisableButton } = action.payload;

  try {
    yield setDisableButton(true);
    const creditCard = yield call(requestPaymentMethod, window.dropinIntance);
    const { data: userData } = yield call(apiServices.getUserInfo);
    const newPaymentData = {
      nonce: creditCard.nonce,
      plan_id: formData.selectedPlan.id,
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
    };
    if (formData.selectedPlan.paymentPlatform === 'PREPAID') {
      yield call(
        apiServices.setPrepaidPlanToDevice,
        userData.account_id,
        parseInt(formData.device_id),
        formData.selectedPlan.id,
        formData.imei
      );
      yield put(fetchTrackersRequestedAction(userData.account_id));
    } else if (formData.selectedPlan.paymentPlatform === 'NONCE') {
      yield call(
        apiServices.setBraintreeNoncePlanToDevice,
        userData.account_id,
        parseInt(formData.device_id),
        newPaymentData
      );
      yield put(fetchTrackersRequestedAction(userData.account_id));
    }
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Add New Device Succeed',
      })
    );
    yield put(updateChannelSaleRequestAction(formData));
    yield put(updateStore({ ...formData, creditCard }));
    yield put(braintreeDropInSuccesAction(action.payload));
    yield callback();
    yield setDisableButton(false);
  } catch (error) {
    const { data } = error;
    yield setDisableButton(false);
    yield put(
      showSnackbar({
        snackType: 'error',
        snackMessage: data.error || data.message,
      })
    );
    yield put(braintreeDropInFailAction(error));
  }
}

function* personalizeDeviceSaga(action: ActionType) {
  const { formData, data, account_id, callback } = action.payload;
  const { value, file } = data;
  try {
    // const res = yield call(apiServices.getSubAccount, account_id);
    // const getNewDevice = find(res.data.device_ids, {
    //   device_id: parseInt(formData.device_id),
    // });

    const device_name = {
      name: value?.device_name,
    };
    yield call(
      apiServices.updateDeviceName,
      account_id,
      parseInt(formData.device_id),
      device_name
    );

    // const [
    //   sample_rate,
    //   samples_per_report,
    //   tracking_measurment,
    // ] = value.device_traking.split('_');
    // const settings = {
    //   preferences: {
    //     tracking_mode: {
    //       sample_rate,
    //       samples_per_report,
    //       tracking_measurment,
    //     },
    //   },
    // };

    // yield call(updateSettings, account_id, getNewDevice.settings_id, settings);

    if (file) {
      const formDataFile = new FormData();
      formDataFile.append('file', file);
      const { data: iconData } = yield call(
        apiServices.uploadImage,
        account_id,
        formData.device_id,
        formDataFile
      );
      yield put(updateStore({ ...formData, icon_url: iconData.icon_url }));
    }

    yield put(addDeviceSuccesAction(action.payload));
    yield callback(true);
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(addDeviceFailAction(payload));
    yield callback(false);
  }
}

function* newChanelSaleSaga(action: ActionType) {
  const { data } = action.payload;
  try {
    yield call(apiServices.newChanelSale, data);
    yield put(newChannelSaleSuccesAction());
  } catch (error) {
    yield put(newChannelSaleFailAction(error));
  }
}

function* updateChanelSaleSaga(action: ActionType) {
  const { data } = action.payload;
  const { bt_response, device_id, selectedPlan } = data;
  try {
    const payload = {
      device_id,
      channel_name: 'AMAZON',
      order_id: '0',
      selectedPlan: selectedPlan.id,
      bt_response,
    };

    yield call(apiServices.updateChanelSale, payload);
    yield put(updateChannelSaleSuccesAction());
  } catch (error) {
    yield put(updateChannelSaleFailAction(error));
  }
}
export default function* watcher() {
  yield takeLatest(
    types.CHECK_DEVICEID_ASSIGNED_REQUESTED,
    checkDeviceAssignedSaga
  );
  yield takeLatest(types.GET_DEVICE_PLAN_REQUESTED, getDevicePlanSaga);
  yield takeLatest(types.BRAINTREE_DROPIN_REQUESTED, braintreeDropinSaga);
  yield takeLatest(
    types.UPDATE_PERSONALIZE_DEVICE_REQUESTED,
    personalizeDeviceSaga
  );
  yield takeLatest(types.NEW_CHANNEL_SALE_REQUESTED, newChanelSaleSaga);
  yield takeLatest(types.UPDATE_CHANNEL_SALE_REQUESTED, updateChanelSaleSaga);
}

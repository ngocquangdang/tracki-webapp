import { PayloadType } from '@Interfaces';
import * as types from '../definitions';

export function getGeoFenceRequestAction(id: number) {
  return {
    type: types.GEO_FENCE_REQUESTED,
    payload: { id },
  };
}

export function getGeoFenceSuccessAction(device: PayloadType) {
  return {
    type: types.GEO_FENCE_SUCCEED,
    payload: { device },
  };
}

export function getGeoFenceFailAction(errors: PayloadType) {
  return {
    type: types.GEO_FENCE_FAILED,
    payload: { errors },
  };
}

import axiosClient from '@Utils/axios';

export const getTrackerSettings = async (
  accountId: number,
  settingId: number
) => {
  return await axiosClient.get(
    `v3/accounts/${accountId}/settings/${settingId}`
  );
};

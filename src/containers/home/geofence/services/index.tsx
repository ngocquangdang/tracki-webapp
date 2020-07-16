import axiosClient from '@Utils/axios';

const GEO_FENCE = '/v3/accounts';

export const getGeoFence = async (id: number) => {
  const url = `${GEO_FENCE}/${id}geozones?limit=20&page=1`;
  return axiosClient.get(url);
};

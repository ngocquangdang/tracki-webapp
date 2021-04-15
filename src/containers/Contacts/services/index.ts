import axiosClient from '@Utils/axios';

export const createContact = async (account_id, data) => {
  return await axiosClient.post(`/v3/accounts/${account_id}/contacts`, data);
};

export const getContactList = async (accountId: number) => {
  return await axiosClient.get(`/v3/accounts/${accountId}/contacts`);
};

export const deleteContactList = async (accountId: number, contact_id) => {
  return await axiosClient.delete(
    `/v3/accounts/${accountId}/contacts/${contact_id}`,
    {},
    {}
  );
};

export const updateContactList = async (
  accountId: number,
  contact_id,
  data
) => {
  return await axiosClient.put(
    `/v3/accounts/${accountId}/contacts/${contact_id}`,
    data
  );
};

export const getUserInfo = async () => {
  return await axiosClient.get(`/v3/user`);
};

export const addContactAssign = async (
  account_id,
  device_id,
  data,
  eventType
) => {
  return await data.map(contact_id => {
    return axiosClient.put(
      `v3/accounts/${account_id}/devices/${device_id}/contacts/${contact_id}`,
      [eventType === 'geozone' ? `${eventType}_${contact_id}` : eventType]
    );
  });
};

export const removeContactAssigned = async (
  account_id,
  device_id,
  data,
  eventType
) => {
  return await data.map(contact_id => {
    return axiosClient.delete(
      `v3/accounts/${account_id}/devices/${device_id}/contacts/${contact_id}`,
      {},
      {
        data: [
          eventType === 'geozone' ? `${eventType}_${contact_id}` : eventType,
        ],
      }
    );
  });
};

export const contactAssigned = async (account_id, device_id) => {
  return axiosClient.get(
    `v3/accounts/${account_id}/devices/${device_id}/contacts`
  );
};

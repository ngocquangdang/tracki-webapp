import axiosWoocommerce from '@Utils/axiosWoocomerce';

export const fetchCoupons = async (page, perPage) => {
  return await axiosWoocommerce.get(
    `/coupons?page=${page}&per_page=${perPage}`
  );
};

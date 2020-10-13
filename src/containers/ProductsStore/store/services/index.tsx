import axiosWoocommerce from '@Utils/axiosWoocomerce';

export const fetchProducts = async (page, perPage) => {
  return await axiosWoocommerce.get(
    `/products?page=${page}&per_page=${perPage}`
  );
};

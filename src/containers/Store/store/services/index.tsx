import axiosWoocommerce from '@Utils/axiosWoocomerce';

export const fetchProducts = async () => {
  return await axiosWoocommerce.get(`/products`);
};

export interface StoreDataTypes {
  isLoading: boolean;
  product: {
    products: object;
    productIds: Array<number | string> | null;
    totalProducts: number;
  };
  coupon: {
    coupons: object;
    couponIds: Array<number | string> | null;
    totalCoupons: number;
  };
  viewMode: string;
  errors: object | null;
  [data: string]: any;
}

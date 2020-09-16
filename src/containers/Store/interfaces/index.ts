export interface StoreDataTypes {
  isLoading: boolean;
  product: {
    products: object;
    productIds: Array<number | string> | null;
  };
  viewMode: string;
  errors: object | null;
  [data: string]: any;
}

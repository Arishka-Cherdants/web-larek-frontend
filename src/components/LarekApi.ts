import { IProduct, IOrder, IOrderResult } from '../types';
import { Api, ApiListResponse } from './base/api';

export interface ILarekApi {
  getPdoducts: () => Promise<IProduct[]>;
  sendOrder: (order: IOrder) => Promise<IOrderResult>;
}

export class LarekApi extends Api implements ILarekApi {  
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
}

getPdoducts(): Promise<IProduct[]> {
  return this.get('/product').then((data: ApiListResponse<IProduct>) =>
      data.items.map((item) => ({
          ...item,
          image: this.cdn + item.image
      }))
  );
};

sendOrder(order: IOrder): Promise<IOrderResult> {
  console.log(order);
  return this.post('/order', order).then(
      (data: IOrderResult) => data
  );
}
}
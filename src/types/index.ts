export interface IProduct {
    category: string; 
    title: string; 
    description: string;
    price: number | null;
    id: string;
    image?: string;
    basketItemIndex?: number;
}

export interface IAppState {
    basket: IProduct[];
    catalog: IProduct[];
    order: IOrder | null;
    preview: string | null
}

export interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}

export interface IOrderForm {
  pay: string;
  adres: string;
  email: string;
  phone: string;
  total: string | number;
}

export interface IOrder extends IOrderForm {
  pay: string;
  items: string[];
}

export interface IOrderResult {
  id: string;
}

export type TPreviewItem = Pick<IProduct, 'category' | 'title' | 'description' | 'price' | 'id' | 'image'>;

export type TBasketItem = Pick<IProduct, 'title' | 'price' | 'id'>;

export type TPayForm = Pick<IOrderForm, 'pay' | 'adres'>;

export type TContactsForm = Pick<IOrderForm, 'email' | 'phone'>;

export type FormErrors = Partial<Record<keyof IOrder, string>>;
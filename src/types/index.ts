interface IProduct {
    category: string; 
    title: string; 
    description: string;
    price: number | null;
    id: string;
    image?: string;
}

interface IAppState {
    basket: string[];
	catalog: IProduct[];
	order: IOrder | null;
	preview: string | null
}

interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}

interface IOrderForm {
  pay: string;
  adres: string;
  email: string;
  phone: string;
  total: string | number;
}

interface IOrder extends IOrderForm {
  items: string[];
}

interface IOrderResult {
  id: string;
}

type TPreviewItem = Pick<IProduct, 'category' | 'title' | 'description' | 'price' | 'id' | 'image'>;

type TBasketItem = Pick<IProduct, 'title' | 'price' | 'id'>;

type TPayForm = Pick<IOrderForm, 'pay' | 'adres'>;

type TContactsForm = Pick<IOrderForm, 'email' | 'phone'>;

type FormErrors = Partial<Record<keyof IOrder, string>>;
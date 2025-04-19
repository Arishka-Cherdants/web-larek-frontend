import { IAppState, IProduct, IOrderForm, IOrder, FormErrors, } from "../types";
import { Model } from "./base/Model"

export class AppState extends Model <IAppState> implements IAppState{
  basket: IProduct[] = [];
	catalog: IProduct[];
	order: IOrder = {
    address: '',
    email: '',
    phone: '',
    payment: '',
    items: [],
    total: "",
  };
	preview: string | null;
  protected errorsForm: FormErrors = {};

    setCatalog(item: IProduct[]) {
        this.catalog = item;
        this.emitChanges('catalogProd:changed', {catalog: this.catalog});
    }

    addProdBasket(item: IProduct){
        this.basket.push(item);
        this.emitChanges('basket:changed', this.basket);
    };

    removeProdBasket(item: IProduct){
        this.basket = this.basket.filter((prod) => prod.id !== item.id);
        this.emitChanges('basket:changed', this.basket);
    };

    clearFullBasket(){
        this.basket = [];
        this.emitChanges('basket:changed', this.basket);
        this.emitChanges('counter:change', this.basket);
    };

    getAllProdsBasket(){
      return this.basket.map((item) => item.id)
    };

    setPreview(item: IProduct){
        this.preview = item.id;
        this.emitChanges('preview:changed', item)
    };

    ProdBeBasket(item: IProduct){
      return this.basket.some((prod) => prod.id === item.id)
    };

    updateOrder(){
      this.order.total = this.getTotal();
      this.order.items = this.basket.map((item) => item.id);
    };

    getTotal(){
        return this.basket.reduce((total, item) => total + item.price, 0);
    };

    clearOrder(){
      this.order = {
        address: '',
            email: '',
            phone: '',
            payment: '',
            items: [],
            total: ''
      }
      this.emitChanges('order:change', this.order)
    };

    setOrder(field: keyof IOrderForm, value: string){
      this.order[field] = value;
      this.validateOrder();
      this.events.emit('order:ready');
    }

    setContacts(field: keyof IOrderForm, value: string){
      this.order[field] = value;

      if (this.validateContacts()) {
          this.events.emit('contacts:ready', this.order)
      }
    };

    getOrder() {
        return {
            payment: this.order.payment,
            address: this.order.address,
            email: this.order.email,
            phone: this.order.phone,
            total: this.order.total,
            items: this.order.items
        };
    };

    validateOrder(){
      const errors: typeof this.errorsForm = {};
		if (!this.order.address) {
			errors.address = 'Укажите адрес!';
		}
		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты!';
		}
		this.errorsForm = errors;
		this.events.emit('errorsForm:change', this.errorsForm);
		return Object.keys(errors).length === 0;
	}

    validateContacts(){
      const errors: typeof this.errorsForm = {};
      if (!this.order.email) {
        errors.email = 'Укажите email!';
      }
      if (!this.order.phone) {
        errors.phone = 'Укажите номер телефона!';
      }
      this.errorsForm = errors;
      this.events.emit('errorsForm:change', this.errorsForm);
      return Object.keys(errors).length === 0;
    };
}
import { IAppState, IProduct, IOrderForm, IOrder, IOrderResult, FormErrors, } from "../types";
import { Model } from "./base/Model"

export class AppState extends Model <IAppState> implements IAppState{
    basket: IProduct[] = [];
	catalog: IProduct[];
	order: IOrder | null;
	preview: string | null;
    protected errorsForm: FormErrors = {};

    setCatalog(catalog: IProduct[]) {
        this.catalog = catalog;
        this.emitChanges('catalogProd:changed', {catalog: this.catalog})ж
    }

    addProdBasket(item: IProduct){
        this.basket.push(item);
        this.emitChanges('product:add', this.basket);
    };

    removeProdBasket(){

    };

    clearFullBasket(){

    };

    getAllProdsBasket(){

    };

    setPreview(item: IProduct){
        this.preview = item.id;
        this.emitChanges('preview:changed', item)
    };

    getProdButton(){

    };

    updateOrder(){

    };

    getTotalPrice(){

    };

    clearOrder(){

    };

    setOrder(){

    };

    getOrder() {
        return {
            pay: this.order.pay,
            adres: this.order.adres,
            email: this.order.email,
            phone: this.order.phone,
            total: this.order.total,
            items: this.order.items
        };
    }

    setContacts(){

    };

    validateOrder(){

    };

    validateContacts(){

    };

    
}
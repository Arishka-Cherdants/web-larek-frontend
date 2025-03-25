type payType = 'Онлайн' | 'При получении';

interface IProduct {
    category: string; 
    title: string; 
    description: string;
    price: number;
    id: string
}

interface IBasketItem {
    product: IProduct;
    counter: number;
    sumPrice: number;
    removel(): void
}

interface IOrder {
    payment: payType;
    address: string;
    email: string;
    phone: string
}

class Basket {
    cards: Map<number, IBasketItem>;
    totalPrice: number;
}

class Card implements IProduct{
    img: HTMLImageElement;
    category: string; 
    title: string; 
    description: string;
    price: number;
    id: string;
    showModalView(): void{};
}

class Order implements IOrder{
    check: Basket;
    payment: payType;
    address: string;
    email: string;
    phone: string;
    sentOrder():void {};
}
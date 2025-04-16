import { IProduct } from "../types";
import { IEvents } from "./base/events";


export class Card implements IProduct {
    category: string; 
    title: string; 
    description: string;
    price: number | null;
    id: string;
    image?: string; 
    }

        // - **`_title`**: название продукта
        
        // - **`_description`**: описание продукта
        
        // - **`_image`**: изображение продукта
        
        // - **`_category`**: категория продукта
        
        // - **`_price`**: цена продукта
        
        // - **`_button`**: кнопка продукта (купить/удалить)
        
        // - **`_basketItemIndex`**: порядковый номер продукта
        
        // Методы:
        
        // - **`set id`**: задаёт id крточки продутка
        
        // - **`get id`**: возвращает id крточки продутка
        
        // - **`set title`**: задаёт заголовок карточки продукта
        
        // - **`get title`**: возвращает заголовок карточки проудкта
        
        // - **`set description`**: задаёт описаение продукта карточки
        
        // - **`set image`**: задаёт изображене продутка
        
        // - **`set category`**: задаёт категорию продутка
        
        // - **`set price`**: задаёт цену товара
        
        // - **`get prace`**: возвращает цену товара
        
        // - **`set button`**: задаёт текст для кнопки
        
        // - **`set basketItemIndex`**: задаёт порядковый номер продукта в корзине
        
    }
}
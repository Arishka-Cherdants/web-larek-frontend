# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды!

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
---


![UML-схема](https://github.com/Arishka-Cherdants/web-larek-frontend/blob/main/image.png)

payType - тип, определяющий доступные методы оплаты:
- Онлайн 
- При получении

--- 

### Описание базовых классов, их предназначение и функции.

### Класс Card (Карточка товара, реализует IProduct)
| Поле/Метод       | Тип              | Описание                 |
|-----------------|-----------------|-------------------------|
| img            | HTMLImageElement | Изображение товара      |
| showModalView() | void            | Показывает детали товара |
| category       | string          | Категория товара        |
| title         | string          | Название товара         |
| description   | string          | Описание товара         |
| price         | number          | Цена товара             |
| id           | string          | Уникальный идентификатор |

находится в основе каждой карточки, реализует интерфейс IProduct
Имеет метод showModalView(), который позволяет увидеть более детальную ифнормацию
о нажатой карточке.

###  Класс Basket (Корзина товаров)
| Поле/Метод  | Тип                        | Описание                    |
|------------|---------------------------|-----------------------------|
| cards      | Map<number, IBasketItem>  | Коллекция товаров в корзине |
| totalPrice | number                     | Общая стоимость корзины     |

корзина товаров для реализации коллекции использует интерфейс IBasketItem, а так же содержит поле с полной стоимостью товаров, собранных в корзине.

### Класс Order (Заказ, реализует IOrder)
| Поле/Метод  | Тип     | Описание                   |
|------------|--------|--------------------------|
| check      | Basket | Корзина с товарами       |
| payment    | payType | Способ оплаты            |
| address    | string | Адрес доставки           |
| email      | string | Email покупателя         |
| phone      | string | Телефон покупателя       |
| sentOrder() | void   | Отправляет заказ на сервер |

оформление заказа. реализует интерфейс IOrder, собирает все данные, введённые пользователме, а затем с помошью метода sentOrder() использует API для отправки заказа на сервер

### Компоненты модели данных (бизнес-логика)

### Интерфейс IProduct (Описание товара)
| Поле        | Тип     | Описание             |
|------------|--------|----------------------|
| category   | string | Категория товара     |
| title      | string | Название товара      |
| description| string | Описание товара      |
| price      | number | Цена товара          |
| id         | string | Уникальный идентификатор |

Интерфейс IProduct необходим для данных карточки товара, содержит поля, необходимые для каждой карточки, отображённой на странице

### Интерфейс IBasketItem (Элемент корзины)
| Поле      | Тип      | Описание                          |
|----------|---------|----------------------------------|
| product  | IProduct | Объект товара                    |
| counter  | number  | Количество товара                 |
| sumPrice | number  | Общая стоимость (цена × кол-во)   |
| remove() | void    | Удаляет товар из корзины          |

Интерфейс IBasketItem необходим для каждого элемента корзиы. Содержит поле с информацией о товаре - product, порядновый номер товара в корзине counter и итоговая стоимость каждого товара, в зависимоти от его колическтва - sumPrice. Содержит метод remove() для удалния конкретного товара из корзиы

### Интерйфейс IOrder (Данные заказа)
| Поле     | Тип     | Описание             |
|---------|--------|----------------------|
| payment | payType | Способ оплаты        |
| address | string | Адрес доставки       |
| email   | string | Email покупателя     |
| phone   | string | Телефон покупателя   |

Интерйфейс IOrder для данных, которые вводит пользователь. 
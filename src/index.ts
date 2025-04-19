import './scss/styles.scss';
import { AppState } from './components/AppState';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { LarekApi } from './components/LarekApi';
import { Page } from './components/Page';
import { Product } from './components/Product';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { IOrderForm, IProduct } from './types';
import { Basket } from './components/common/Basket';
import { Order, Сontacts } from './components/Order';
import { Success } from './components/common/Success';
import type { TPayForm as PaymentForm, TContactsForm as ContactForm } from './types/index';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

// Все шаблоны
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');


// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Сontacts(cloneTemplate(contactsTemplate), events);
 
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});
// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on('catalogProd:changed', () => {
  page.catalog = appData.catalog.map((item) => {
    const prod = new Product(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('product:select', item),
    });
    return prod.render({
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
    });
  });
});

//подробный просмтор товара
events.on('product:select', (item: IProduct) => {
  appData.setPreview(item);
});

//добавление и удаление товара из корзины
events.on('preview:changed', (item: IProduct) => {
  const prod = new Product(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      if (appData.ProdBeBasket(item)) {
        events.emit('product:remove', item);
				prod.button = 'В корзину';
      } else {
        events.emit('product:add', item);
        prod.button = 'Удалить из корзины';
      }
    },
  });
  
  if (appData.ProdBeBasket(item)) {
    prod.button = 'Удалить из корзины'
  } else {
    prod.button = 'В корзину'
  }
  
  modal.render({
		content: prod.render({
			category: item.category,
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
		}),
	});
});

events.on('product:remove', (item: IProduct) => {
  appData.removeProdBasket(item);
  appData.updateOrder();
  
  page.counter = appData.basket.length;
  basket.total = appData.getTotal();
  
  updateBasketItems();
});

// Открытие корзины
events.on('basket:open', () => {
  basket.total = appData.getTotal();
  updateBasketItems();
  modal.render({
    content: basket.render({}),
  });
});

//Добавляем вспомогательную функцию для обновления списка товаров
function updateBasketItems() {
  basket.list = appData.basket.map((item, index) => {
    const basketProd = new Product(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit('product:remove', item),
    });
    return basketProd.render({
      title: item.title,
      price: item.price,
      basketItemIndex: index + 1, 
    });
  });
}


//добавление товара в корзину
events.on('product:add', (item: IProduct) => {
  appData.addProdBasket(item);
  page.counter = appData.basket.length;
  basket.total = appData.getTotal();
});

// //удаление товара из корзины
// events.on('product:remove', (item: IProduct) => {
//   appData.removeProdBasket(item);
//   appData.updateOrder();
//   page.counter = appData.basket.length;
//   basket.total = appData.getTotal();
//   let i = 1;
//   basket.list = appData.basket.map((item) => {
//     const prod = new Product(cloneTemplate(cardBasketTemplate), {
//       onClick: () => events.emit('basket:changed', item),
//     });
//     return prod.render({
//       title: item.title,
//       price: item.price,
//       basketItemIndex: i++,
//     });
//   });
//   modal.render({
//     content: basket.render(),
//   });
// });

// events.on('basket:open', () => {
//   basket.total = appData.getTotal();
//   let i = 1;
//   basket.list = appData.basket.map((item) => {
//     const basketProd = new Product(cloneTemplate(cardBasketTemplate), {
//       onClick: () => events.emit('product:remove', item),
//     });
//     return basketProd.render({
//       title: item.title,
//       price: item.price,
//       basketItemIndex: i++,
//     });
//   });
//   modal.render({
//     content: basket.render({}),
//   });
// });

// events.on('basket:changed', () => {
//  	page.counter = appData.basket.length;

// 	basket.list = appData.basket.map((item) => {
// 		const product = new Product(cloneTemplate(cardBasketTemplate), {
// 			onClick: () => {
// 				events.emit('product:remove', item);
// 			},
// 		});
// 		return product.render({
// 			title: item.title,
// 			price: item.price,
// 		});
// 	});
// 	basket.total = appData.getTotal();
// });

//открытие формы заказа
events.on('order:open', () => {
  modal.render({
    content: order.render({
      payment: '',
      address: '',
      valid: false,
      errors: [],
    }),
  });
});

 events.on('payment:changed', (button: HTMLButtonElement) => {
   appData.setOrder('payment', button.name);
 });

events.on('errorsForm:change', (errors: Partial<ContactForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on('errorsForm:change', (errors: Partial<PaymentForm>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});


events.on(
  /^contacts\..*:change/,
  (data: { field: keyof IOrderForm; value: string }) => {
    appData.setContacts(data.field, data.value);
  }
);

events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrder(data.field, data.value);
	}
);

events.on('order:ready', () => {
	order.payment = appData.order.payment;
});

//открытие формы контактов
events.on('order:submit', () => {
  appData.basket.map((item) => item.id);
  modal.render({
    content: contacts.render({
      email: '',
      phone: '',
      valid: false,
      errors: [],
    }),
  });
});

events.on('contacts:submit', () => {
  const payment = {
		...appData.getOrder(),
		total: appData.getTotal(),
		items: appData.getAllProdsBasket(),
	};
  api
    .sendOrder(payment)
    .then((res) => {
      modal.render({
        content: success.render({
					total: res.total,
      })
    })
      appData.clearFullBasket();
      appData.clearOrder();
      page.counter = appData.basket.length;
    })
    .catch((err: Error) => {
      console.error(err);
    });
});

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

api
  .getPdoducts()
  .then((data) => {
    appData.setCatalog(data);
  })
  .catch((error) => {
    console.log(error);
  });
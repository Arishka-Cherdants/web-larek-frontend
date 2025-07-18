import type { TPayForm as PaymentForm, TContactsForm as ContactForm } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<PaymentForm> {
  protected _offline: HTMLButtonElement;
  protected _online: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

    this._offline = ensureElement<HTMLButtonElement>(
			'button[name=cash]',
			container
		);

		this._online = ensureElement<HTMLButtonElement>(
			'button[name=card]',
			container
		);

    this._offline.addEventListener('click', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = 'payment';
			const value = target.name;
			this.onInputChange(field, value);
		});
		
		this._online.addEventListener('click', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = 'payment';
			const value = target.name;
			this.onInputChange(field, value);
		});

     const addressInput = ensureElement<HTMLInputElement>('input[name=address]', container);
     addressInput.addEventListener('input', () => {
       this.onInputChange('address', addressInput.value);
 });

	}

  protected onInputChange(field: keyof PaymentForm, value: string) {
		this.events.emit(`order.${field}:change`, {
			field,
			value,
		});
	}

	set payment(value: string) {
		this.toggleClass(
			this.container.elements.namedItem('card') as HTMLInputElement,
			'button_alt',
			(this.container.elements.namedItem('card') as HTMLInputElement).name !==
				value
		);
		this.toggleClass(
			this.container.elements.namedItem('cash') as HTMLInputElement,
			'button_alt',
			(this.container.elements.namedItem('cash') as HTMLInputElement).name !==
				value
		);
	}

  set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}

export class Сontacts extends Form<ContactForm> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value =
      value;
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value =
      value;
  }
}

// export class Сontacts extends Form<ContactForm> {
//   protected _emailInput: HTMLInputElement;
//   protected _phoneInput: HTMLInputElement;
//   constructor(container: HTMLFormElement, events: IEvents) {
//     super(container, events); 
//     this._emailInput = ensureElement<HTMLInputElement>('input[name=email]', container);
//     this._phoneInput = ensureElement<HTMLInputElement>('input[name=phone]', container);
//     this._emailInput.addEventListener('input', () => {
//       this.onInputChange('email', this._emailInput.value);
// });
//     this._phoneInput.addEventListener('input', () => {
//       this.onInputChange('phone', this._phoneInput.value);
//     });
//   }

//   protected onInputChange(field: keyof ContactForm, value: string) {
// 		this.events.emit(`order.${field}:change`, {
// 			field,
// 			value,
// 		});
// 	}

//   set email(value: string) {
// 		(this.container.elements.namedItem('email') as HTMLInputElement).value =
// 			value;
// 	}

//   set phone(value: string) {
// 		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
// 			value;
// 	}
// }
import type { TPayForm as PaymentForm, TContactsForm as ContactForm } from '../types';
import { ensureAllElements } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<PaymentForm> {
  protected _buttons: HTMLButtonElement[];
  protected _pay: string;
  protected _adres: string;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._buttons = ensureAllElements<HTMLButtonElement>(
      '.button_alt',
      container
    );

    this._buttons.forEach((button) => {
      button.addEventListener('click', () => {
        this._pay = button.name;
        events.emit('payment:changed', button);
      });
    });
  }

  set pay(name: string) {
    this._buttons.forEach((button) => {
      this.toggleClass(button, 'button_alt-active', button.name === name);
    });
  }

  set adres(value: string) {
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
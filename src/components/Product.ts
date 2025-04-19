import { Component } from './base/Component';
import { IProduct } from '../types';
import { cloneTemplate, ensureElement} from '../utils/utils';

enum Categorys {
  'софт-скил' = 'card__category_soft',
  'другое' = 'card__category_other',
  'дополнительное' = 'card__category_additional',
  'кнопка' = 'card__category_button',
  'хард-скил' = 'card__category_hard',
}

interface IProdActions {
  onClick: (event: MouseEvent) => void;
}

export class Product extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;  
  protected _category: HTMLElement;    
  protected _price: HTMLElement;  
  protected _button: HTMLButtonElement;   
  protected _basketItemIndex: HTMLElement;
  protected _element: HTMLElement;

  constructor (container: HTMLTemplateElement, actions?: IProdActions) {
    super (container);

    this._title = container.querySelector('.card__title');
    this._description = container.querySelector('.card__text'); 
    this._image = container.querySelector('.card__image');
    this._category = container.querySelector('.card__category');
    this._price = container.querySelector('.card__price');
    this._button = container.querySelector('.card__button');
    this._basketItemIndex = container.querySelector('.basket__item-index');
    
    if (actions?.onClick) {
      if (this._button) {
          this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

  set id(value:string) {
    this.container.dataset.id = value;
  };

  get id(): string {
    return this.container.dataset.id || '';
};

  set title(value: string) {
      this.setText(this._title, value);
  };

  get title(): string {
      return this._title.textContent || '';
  };

  set image(value: string) {
      this.setImage(this._image, value, this.title)
  };

  set description(value: string) {
    this.setText(this._description, value);
  };

  set category(value: string){
    this.setText(this._category, value);
    if (value in Categorys) {
      this._category.classList.add(Categorys[value as keyof typeof Categorys]);
  } 
  };

  set price(value: string){
    if (!value) {
      this.setText(this._price, `Бесценно`)
    } else {
    this.setText(this._price, `${value} синапсов`)
    }
  };

  get price(){
    return this._price.textContent
  };

  set button(value: string){
    this.setText(this._button, value)
  };

  set basketItemIndex(value: string){
    this._basketItemIndex.textContent = value
  };

}
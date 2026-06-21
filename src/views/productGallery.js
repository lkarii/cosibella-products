import { formatPrice } from '../utils/format.js';
import { createStockAction } from './stockAction.js';
import { PLACEHOLDER_ICON } from './placeholderIcon.js';

export function renderProductGallery(container, products, onOpenProduct) {
  container.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.tabIndex = 0;

    const thumb = document.createElement('div');
    thumb.className = 'product-card__thumb';
    thumb.innerHTML = PLACEHOLDER_ICON;
    thumb.append(createStockAction(product.stock));

    const categoryEl = document.createElement('p');
    categoryEl.className = 'product-card__category';
    categoryEl.textContent = product.category;

    const nameEl = document.createElement('h3');
    nameEl.className = 'product-card__name';
    nameEl.textContent = product.name;

    const priceEl = document.createElement('p');
    priceEl.className = 'product-card__price';
    priceEl.textContent = formatPrice(product.price);

    const body = document.createElement('div');
    body.className = 'product-card__body';
    body.append(categoryEl, nameEl, priceEl);

    card.append(thumb, body);

    const open = () => onOpenProduct(product, card);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });

    container.append(card);
  });
}

import { formatPrice } from '../utils/format.js';
import { createStockAction } from './stockAction.js';

function createTags(product) {
  const tagsEl = document.createElement('div');
  tagsEl.className = 'product-row__tags tags-list';

  if (Array.isArray(product.tags)) {
    product.tags.forEach((tag) => {
      const chip = document.createElement('span');
      chip.className = 'tag-chip';
      chip.textContent = tag;
      tagsEl.append(chip);
    });
  }

  return tagsEl;
}

export function renderProductTable(container, products, onOpenProduct) {
  container.innerHTML = '';

  products.forEach((product) => {
    const row = document.createElement('div');
    row.className = 'product-row';
    row.tabIndex = 0;

    const idEl = document.createElement('span');
    idEl.className = 'product-row__id';
    idEl.textContent = product.id;

    const identity = document.createElement('div');
    identity.className = 'product-row__identity';

    const categoryEl = document.createElement('p');
    categoryEl.className = 'product-row__category';
    categoryEl.textContent = product.category;

    const nameEl = document.createElement('p');
    nameEl.className = 'product-row__name';
    nameEl.textContent = product.name;

    identity.append(categoryEl, nameEl);

    const priceEl = document.createElement('span');
    priceEl.className = 'product-row__price';
    priceEl.textContent = formatPrice(product.price);

    row.append(idEl, identity, createTags(product), priceEl, createStockAction(product.stock));

    const open = () => onOpenProduct(product, row);
    row.addEventListener('click', open);
    row.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });

    container.append(row);
  });
}

import { formatPrice } from '../utils/format.js';
import { createStockAction } from './stockAction.js';

function createCell(text) {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
}

function createNameCell(product) {
  const td = document.createElement('td');

  const nameEl = document.createElement('div');
  nameEl.className = 'product-table__name';
  nameEl.textContent = product.name;
  td.append(nameEl);

  if (Array.isArray(product.tags) && product.tags.length > 0) {
    const tagsEl = document.createElement('div');
    tagsEl.className = 'tags-list';
    product.tags.forEach((tag) => {
      const chip = document.createElement('span');
      chip.className = 'tag-chip';
      chip.textContent = tag;
      tagsEl.append(chip);
    });
    td.append(tagsEl);
  }

  return td;
}

function createActionCell(stock) {
  const td = document.createElement('td');
  td.className = 'product-table__action-cell';
  td.append(createStockAction(stock));
  return td;
}

export function renderProductTable(tbody, products, onOpenProduct) {
  tbody.innerHTML = '';

  products.forEach((product) => {
    const row = document.createElement('tr');
    row.className = 'product-table__row';
    row.tabIndex = 0;

    row.append(
      createCell(product.id),
      createNameCell(product),
      createCell(product.category),
      createCell(formatPrice(product.price)),
      createActionCell(product.stock)
    );

    const open = () => onOpenProduct(product, row);
    row.addEventListener('click', open);
    row.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });

    tbody.append(row);
  });
}

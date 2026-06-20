import { formatPrice } from '../utils/format.js';

function createCell(text) {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
}

export function renderProductTable(tbody, products, onOpenProduct) {
  tbody.innerHTML = '';

  products.forEach((product) => {
    const row = document.createElement('tr');
    row.className = 'product-table__row';
    row.tabIndex = 0;

    row.append(
      createCell(product.name),
      createCell(product.category),
      createCell(formatPrice(product.price))
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

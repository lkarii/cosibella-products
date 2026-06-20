import { formatPrice } from '../utils/format.js';
import { getCategoryColors } from '../utils/categoryColor.js';

const PLACEHOLDER_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <path d="M21 15l-5-5L5 21"></path>
  </svg>
`;

export function renderProductGallery(container, products, onOpenProduct) {
  container.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.tabIndex = 0;

    const thumb = document.createElement('div');
    thumb.className = 'product-card__thumb';
    const colors = getCategoryColors(product.category);
    thumb.style.backgroundColor = colors.bg;
    thumb.style.color = colors.fg;
    thumb.innerHTML = PLACEHOLDER_ICON;

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

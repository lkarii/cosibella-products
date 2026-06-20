import { formatPrice, formatStock } from '../utils/format.js';

const FIELD_LABELS = {
  id: 'ID',
  category: 'Kategoria',
  price: 'Cena',
  stock: 'Dostępność',
  tags: 'Tagi',
  description: 'Opis',
};

const KNOWN_FIELD_ORDER = ['id', 'category', 'price', 'stock', 'tags', 'description'];

let dialogEl = null;
let contentEl = null;
let triggerElement = null;

export function initModal() {
  dialogEl = document.getElementById('product-modal');
  contentEl = document.getElementById('product-modal-content');

  dialogEl.addEventListener('click', (event) => {
    if (event.target === dialogEl) {
      dialogEl.close();
    }
  });

  dialogEl.addEventListener('close', () => {
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  });
}

function renderField(key, value) {
  const row = document.createElement('div');
  row.className = 'product-modal__field';

  const label = document.createElement('dt');
  label.className = 'product-modal__field-label';
  label.textContent = FIELD_LABELS[key] || key;

  const valueEl = document.createElement('dd');
  valueEl.className = 'product-modal__field-value';

  if (key === 'price' && typeof value === 'number') {
    valueEl.textContent = formatPrice(value);
  } else if (key === 'stock' && typeof value === 'boolean') {
    valueEl.textContent = formatStock(value);
    valueEl.classList.add(value ? 'product-modal__stock--in' : 'product-modal__stock--out');
  } else if (Array.isArray(value)) {
    value.forEach((entry) => {
      const chip = document.createElement('span');
      chip.className = 'product-modal__tag';
      chip.textContent = entry;
      valueEl.append(chip);
    });
  } else if (value !== null && typeof value === 'object') {
    valueEl.textContent = JSON.stringify(value);
  } else {
    valueEl.textContent = String(value);
  }

  row.append(label, valueEl);
  return row;
}

export function openProductModal(product, trigger) {
  triggerElement = trigger || null;
  contentEl.innerHTML = '';

  const title = document.createElement('h2');
  title.className = 'product-modal__title';
  title.textContent = product.name;
  contentEl.append(title);

  const fieldsList = document.createElement('dl');
  fieldsList.className = 'product-modal__fields';

  const renderedKeys = new Set(['name']);
  KNOWN_FIELD_ORDER.forEach((key) => {
    if (key in product) {
      fieldsList.append(renderField(key, product[key]));
      renderedKeys.add(key);
    }
  });

  Object.entries(product).forEach(([key, value]) => {
    if (!renderedKeys.has(key)) {
      fieldsList.append(renderField(key, value));
    }
  });

  contentEl.append(fieldsList);
  dialogEl.showModal();
}

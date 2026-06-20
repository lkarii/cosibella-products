const PRICE_DEBOUNCE_MS = 350;

export function mountFilters(container, categories, initialFilters, handlers) {
  container.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'filters__form';
  form.addEventListener('submit', (event) => event.preventDefault());

  const categoryGroup = document.createElement('div');
  categoryGroup.className = 'filters__group';

  const categoryLabel = document.createElement('label');
  categoryLabel.htmlFor = 'category-filter';
  categoryLabel.textContent = 'Kategoria';

  const select = document.createElement('select');
  select.id = 'category-filter';
  select.name = 'category';

  const allOption = document.createElement('option');
  allOption.value = '';
  allOption.textContent = 'Wszystkie kategorie';
  select.append(allOption);

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    select.append(option);
  });

  select.value = initialFilters.category || '';
  select.addEventListener('change', () => {
    handlers.onCategoryChange(select.value);
  });

  categoryGroup.append(categoryLabel, select);

  const priceGroup = document.createElement('div');
  priceGroup.className = 'filters__group filters__group--price';

  const minLabel = document.createElement('label');
  minLabel.htmlFor = 'min-price-filter';
  minLabel.textContent = 'Cena od';

  const minInput = document.createElement('input');
  minInput.type = 'number';
  minInput.id = 'min-price-filter';
  minInput.min = '0';
  minInput.step = '0.01';
  minInput.placeholder = '0';
  if (initialFilters.minPrice != null) minInput.value = initialFilters.minPrice;

  const maxLabel = document.createElement('label');
  maxLabel.htmlFor = 'max-price-filter';
  maxLabel.textContent = 'Cena do';

  const maxInput = document.createElement('input');
  maxInput.type = 'number';
  maxInput.id = 'max-price-filter';
  maxInput.min = '0';
  maxInput.step = '0.01';
  maxInput.placeholder = '9999';
  if (initialFilters.maxPrice != null) maxInput.value = initialFilters.maxPrice;

  let debounceTimer = null;
  const emitPriceChange = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const minPrice = minInput.value === '' ? null : parseFloat(minInput.value);
      const maxPrice = maxInput.value === '' ? null : parseFloat(maxInput.value);
      handlers.onPriceChange({
        minPrice: Number.isNaN(minPrice) ? null : minPrice,
        maxPrice: Number.isNaN(maxPrice) ? null : maxPrice,
      });
    }, PRICE_DEBOUNCE_MS);
  };

  minInput.addEventListener('input', emitPriceChange);
  maxInput.addEventListener('input', emitPriceChange);

  priceGroup.append(minLabel, minInput, maxLabel, maxInput);
  form.append(categoryGroup, priceGroup);
  container.append(form);

  return {
    setValues(filters) {
      select.value = filters.category || '';
      minInput.value = filters.minPrice != null ? filters.minPrice : '';
      maxInput.value = filters.maxPrice != null ? filters.maxPrice : '';
    },
    clearPendingDebounce() {
      clearTimeout(debounceTimer);
    },
  };
}

const PRICE_DEBOUNCE_MS = 350;
const SEARCH_DEBOUNCE_MS = 350;

const SORT_OPTIONS = [
  { value: '', label: 'Bez sortowania' },
  { value: 'id-asc', label: 'ID ↑' },
  { value: 'id-desc', label: 'ID ↓' },
  { value: 'name-asc', label: 'Nazwa A-Z' },
  { value: 'name-desc', label: 'Nazwa Z-A' },
  { value: 'price-asc', label: 'Cena ↑' },
  { value: 'price-desc', label: 'Cena ↓' },
];

export function mountFilters(container, categories, initialFilters, initialSort, handlers) {
  container.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'filters__form';
  form.addEventListener('submit', (event) => event.preventDefault());

  const searchGroup = document.createElement('div');
  searchGroup.className = 'filters__group';

  const searchLabel = document.createElement('label');
  searchLabel.htmlFor = 'search-filter';
  searchLabel.textContent = 'Szukaj';

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.id = 'search-filter';
  searchInput.placeholder = 'Nazwa produktu…';
  searchInput.value = initialFilters.search || '';

  let searchDebounceTimer = null;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      handlers.onSearchChange(searchInput.value);
    }, SEARCH_DEBOUNCE_MS);
  });

  searchGroup.append(searchLabel, searchInput);

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

  const minGroup = document.createElement('div');
  minGroup.className = 'filters__group';

  const minLabel = document.createElement('label');
  minLabel.htmlFor = 'min-price-filter';
  minLabel.textContent = 'Cena od';

  const minInput = document.createElement('input');
  minInput.type = 'number';
  minInput.id = 'min-price-filter';
  minInput.min = '0';
  minInput.step = '0.01';
  minInput.placeholder = '100,50';
  if (initialFilters.minPrice != null) minInput.value = initialFilters.minPrice;

  minGroup.append(minLabel, minInput);

  const maxGroup = document.createElement('div');
  maxGroup.className = 'filters__group';

  const maxLabel = document.createElement('label');
  maxLabel.htmlFor = 'max-price-filter';
  maxLabel.textContent = 'Cena do';

  const maxInput = document.createElement('input');
  maxInput.type = 'number';
  maxInput.id = 'max-price-filter';
  maxInput.min = '0';
  maxInput.step = '0.01';
  maxInput.placeholder = '500,50';
  if (initialFilters.maxPrice != null) maxInput.value = initialFilters.maxPrice;

  maxGroup.append(maxLabel, maxInput);

  let priceDebounceTimer = null;
  const emitPriceChange = () => {
    clearTimeout(priceDebounceTimer);
    priceDebounceTimer = setTimeout(() => {
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

  const sortGroup = document.createElement('div');
  sortGroup.className = 'filters__group';

  const sortLabel = document.createElement('label');
  sortLabel.htmlFor = 'sort-filter';
  sortLabel.textContent = 'Sortuj';

  const sortSelect = document.createElement('select');
  sortSelect.id = 'sort-filter';

  SORT_OPTIONS.forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    sortSelect.append(option);
  });

  sortSelect.value = initialSort;
  sortSelect.addEventListener('change', () => {
    handlers.onSortChange(sortSelect.value);
  });

  sortGroup.append(sortLabel, sortSelect);

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'filters__clear-btn';
  clearBtn.textContent = 'Wyczyść filtry';
  clearBtn.addEventListener('click', () => {
    clearTimeout(searchDebounceTimer);
    clearTimeout(priceDebounceTimer);
    searchInput.value = '';
    select.value = '';
    minInput.value = '';
    maxInput.value = '';
    handlers.onClearFilters();
  });

  form.append(searchGroup, categoryGroup, minGroup, maxGroup, sortGroup, clearBtn);
  container.append(form);

  return {
    setValues(filters) {
      searchInput.value = filters.search || '';
      select.value = filters.category || '';
      minInput.value = filters.minPrice != null ? filters.minPrice : '';
      maxInput.value = filters.maxPrice != null ? filters.maxPrice : '';
    },
    setSort(sort) {
      sortSelect.value = sort;
    },
    clearPendingDebounce() {
      clearTimeout(searchDebounceTimer);
      clearTimeout(priceDebounceTimer);
    },
  };
}

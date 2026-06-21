export const DEFAULT_PAGE_SIZE = 10;
export const VALID_PAGE_SIZES = [5, 10, 20];
export const VALID_SORTS = ['id-asc', 'id-desc', 'name-asc', 'name-desc', 'price-asc', 'price-desc'];

const SORT_COMPARATORS = {
  'id-asc': (a, b) => a.id - b.id,
  'id-desc': (a, b) => b.id - a.id,
  'name-asc': (a, b) => a.name.localeCompare(b.name),
  'name-desc': (a, b) => b.name.localeCompare(a.name),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

const state = {
  products: [],
  categories: [],
  filters: { category: '', minPrice: null, maxPrice: null, search: '' },
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  sort: '',
  view: null,
};

export function setProducts(products) {
  state.products = products;
  state.categories = [...new Set(products.map((product) => product.category))].sort();
}

export function getCategories() {
  return state.categories;
}

export function setFilters(filters) {
  state.filters = { ...filters };
}

export function getFilters() {
  return state.filters;
}

export function setPage(page) {
  state.page = page;
}

export function getPage() {
  return state.page;
}

export function setPageSize(pageSize) {
  state.pageSize = VALID_PAGE_SIZES.includes(pageSize) ? pageSize : DEFAULT_PAGE_SIZE;
}

export function getPageSize() {
  return state.pageSize;
}

export function setSort(sort) {
  state.sort = VALID_SORTS.includes(sort) ? sort : '';
}

export function getSort() {
  return state.sort;
}

export function setView(view) {
  state.view = view;
}

export function getView() {
  return state.view;
}

function getFilteredProducts() {
  const { category, minPrice, maxPrice, search } = state.filters;
  const query = search ? search.trim().toLowerCase() : '';
  const filtered = state.products.filter((product) => {
    if (category && product.category !== category) return false;
    if (minPrice != null && product.price < minPrice) return false;
    if (maxPrice != null && product.price > maxPrice) return false;
    if (query && !product.name.toLowerCase().includes(query)) return false;
    return true;
  });

  const comparator = SORT_COMPARATORS[state.sort];
  return comparator ? [...filtered].sort(comparator) : filtered;
}

export function getTotalPages(itemCount) {
  return Math.max(1, Math.ceil(itemCount / state.pageSize));
}

export function clampPage() {
  const totalPages = getTotalPages(getFilteredProducts().length);
  state.page = Math.min(Math.max(state.page, 1), totalPages);
}

export function getVisiblePage() {
  const filtered = getFilteredProducts();
  const totalPages = getTotalPages(filtered.length);
  const start = (state.page - 1) * state.pageSize;

  return {
    items: filtered.slice(start, start + state.pageSize),
    totalItems: filtered.length,
    totalPages,
    page: state.page,
  };
}

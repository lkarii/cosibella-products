import { DEFAULT_PAGE_SIZE, VALID_PAGE_SIZES, VALID_SORTS } from './appState.js';

const VALID_VIEWS = ['table', 'gallery'];

function parseNumberParam(value) {
  if (value === null) return null;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export function parseUrlState() {
  const params = new URLSearchParams(location.search);

  const category = params.get('category') || '';
  const minPrice = parseNumberParam(params.get('minPrice'));
  const maxPrice = parseNumberParam(params.get('maxPrice'));
  const search = params.get('q') || '';

  const pageParam = Number(params.get('page'));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const pageSizeParam = Number(params.get('pageSize'));
  const pageSize = VALID_PAGE_SIZES.includes(pageSizeParam) ? pageSizeParam : DEFAULT_PAGE_SIZE;

  const sortParam = params.get('sort');
  const sort = VALID_SORTS.includes(sortParam) ? sortParam : '';

  const viewParam = params.get('view');
  const view = VALID_VIEWS.includes(viewParam) ? viewParam : null;

  return { filters: { category, minPrice, maxPrice, search }, page, pageSize, sort, view };
}

export function validateCategory(category, validCategories) {
  return validCategories.includes(category) ? category : '';
}

export function syncUrl(filters, page, pageSize, sort, view, { push = false } = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.minPrice != null) params.set('minPrice', filters.minPrice);
  if (filters.maxPrice != null) params.set('maxPrice', filters.maxPrice);
  if (filters.search) params.set('q', filters.search);
  if (page > 1) params.set('page', String(page));
  if (pageSize !== DEFAULT_PAGE_SIZE) params.set('pageSize', String(pageSize));
  if (sort) params.set('sort', sort);
  if (view) params.set('view', view);

  const query = params.toString();
  const newUrl = query ? `${location.pathname}?${query}` : location.pathname;
  history[push ? 'pushState' : 'replaceState'](null, '', newUrl);
}

export function onUrlNavigated(callback) {
  window.addEventListener('popstate', callback);
}

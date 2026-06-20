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

  const pageParam = Number(params.get('page'));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  return { filters: { category, minPrice, maxPrice }, page };
}

export function validateCategory(category, validCategories) {
  return validCategories.includes(category) ? category : '';
}

export function syncUrl(filters, page, { push = false } = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.minPrice != null) params.set('minPrice', filters.minPrice);
  if (filters.maxPrice != null) params.set('maxPrice', filters.maxPrice);
  if (page > 1) params.set('page', String(page));

  const query = params.toString();
  const newUrl = query ? `${location.pathname}?${query}` : location.pathname;
  history[push ? 'pushState' : 'replaceState'](null, '', newUrl);
}

export function onUrlNavigated(callback) {
  window.addEventListener('popstate', callback);
}

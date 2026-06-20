import './styles/main.scss';
import { fetchProducts } from './api/products.js';
import * as appState from './state/appState.js';
import { parseUrlState, validateCategory, syncUrl, onUrlNavigated } from './state/urlState.js';
import { renderProductTable } from './views/productTable.js';
import { mountFilters } from './views/filters.js';
import { renderPagination } from './views/pagination.js';

const tableBody = document.getElementById('product-table-body');
const filtersContainer = document.getElementById('filters');
const paginationContainer = document.getElementById('pagination');

let filtersHandle = null;

function recomputeAndRender() {
  appState.clampPage();
  const { items, page, totalPages } = appState.getVisiblePage();

  renderProductTable(tableBody, items, () => {});
  renderPagination(paginationContainer, { page, totalPages }, handlePageChange);
}

function syncAndRender({ push = false } = {}) {
  syncUrl(appState.getFilters(), appState.getPage(), { push });
  recomputeAndRender();
}

function handleCategoryChange(category) {
  appState.setFilters({ ...appState.getFilters(), category });
  appState.setPage(1);
  syncAndRender({ push: false });
}

function handlePriceChange({ minPrice, maxPrice }) {
  appState.setFilters({ ...appState.getFilters(), minPrice, maxPrice });
  appState.setPage(1);
  syncAndRender({ push: false });
}

function handlePageChange(page) {
  appState.setPage(page);
  syncAndRender({ push: true });
}

function handlePopState() {
  filtersHandle?.clearPendingDebounce();

  const { filters, page } = parseUrlState();
  const category = validateCategory(filters.category, appState.getCategories());

  appState.setFilters({ ...filters, category });
  appState.setPage(page);
  filtersHandle?.setValues(appState.getFilters());

  recomputeAndRender();
}

async function loadProducts() {
  const products = await fetchProducts();
  appState.setProducts(products);

  const { filters, page } = parseUrlState();
  const category = validateCategory(filters.category, appState.getCategories());
  appState.setFilters({ ...filters, category });
  appState.setPage(page);

  filtersHandle = mountFilters(filtersContainer, appState.getCategories(), appState.getFilters(), {
    onCategoryChange: handleCategoryChange,
    onPriceChange: handlePriceChange,
  });

  syncAndRender({ push: false });
}

onUrlNavigated(handlePopState);
loadProducts();

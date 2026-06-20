import './styles/main.scss';
import { fetchProducts } from './api/products.js';
import * as appState from './state/appState.js';
import { renderProductTable } from './views/productTable.js';
import { mountFilters } from './views/filters.js';
import { renderPagination } from './views/pagination.js';

const tableBody = document.getElementById('product-table-body');
const filtersContainer = document.getElementById('filters');
const paginationContainer = document.getElementById('pagination');

function recomputeAndRender() {
  appState.clampPage();
  const { items, page, totalPages } = appState.getVisiblePage();

  renderProductTable(tableBody, items, () => {});
  renderPagination(paginationContainer, { page, totalPages }, handlePageChange);
}

function handleCategoryChange(category) {
  appState.setFilters({ ...appState.getFilters(), category });
  appState.setPage(1);
  recomputeAndRender();
}

function handlePriceChange({ minPrice, maxPrice }) {
  appState.setFilters({ ...appState.getFilters(), minPrice, maxPrice });
  appState.setPage(1);
  recomputeAndRender();
}

function handlePageChange(page) {
  appState.setPage(page);
  recomputeAndRender();
}

async function loadProducts() {
  const products = await fetchProducts();
  appState.setProducts(products);

  mountFilters(filtersContainer, appState.getCategories(), appState.getFilters(), {
    onCategoryChange: handleCategoryChange,
    onPriceChange: handlePriceChange,
  });

  recomputeAndRender();
}

loadProducts();

import './styles/main.scss';
import { fetchProducts } from './api/products.js';
import * as appState from './state/appState.js';
import { parseUrlState, validateCategory, syncUrl, onUrlNavigated } from './state/urlState.js';
import { renderProductTable } from './views/productTable.js';
import { renderProductGallery } from './views/productGallery.js';
import { mountFilters } from './views/filters.js';
import { renderPagination } from './views/pagination.js';
import { initModal, openProductModal } from './views/modal.js';
import { initStatusViews, showLoading, showError, showResults, setRetryDisabled } from './views/statusViews.js';
import { initThemeToggle } from './views/theme.js';

const MOBILE_QUERY = '(max-width: 480px)';

const pageLoader = document.getElementById('page-loader');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const tableBody = document.getElementById('product-table-body');
const tableWrapper = document.querySelector('.table-wrapper');
const galleryContainer = document.getElementById('product-gallery');
const filtersContainer = document.getElementById('filters');
const paginationContainer = document.getElementById('pagination');
const viewTableBtn = document.getElementById('view-table-btn');
const viewGalleryBtn = document.getElementById('view-gallery-btn');

let filtersHandle = null;
let isFetching = false;

function hidePageLoader() {
  pageLoader.classList.add('is-hidden');
}

function getDefaultView() {
  return window.matchMedia(MOBILE_QUERY).matches ? 'gallery' : 'table';
}

function getEffectiveView() {
  return appState.getView() ?? getDefaultView();
}

function updateViewToggleUI(view) {
  viewTableBtn.classList.toggle('view-toggle__btn--active', view === 'table');
  viewTableBtn.setAttribute('aria-pressed', String(view === 'table'));
  viewGalleryBtn.classList.toggle('view-toggle__btn--active', view === 'gallery');
  viewGalleryBtn.setAttribute('aria-pressed', String(view === 'gallery'));
}

function renderActiveView(items) {
  const view = getEffectiveView();
  updateViewToggleUI(view);

  if (view === 'gallery') {
    tableWrapper.classList.add('is-hidden');
    galleryContainer.classList.remove('is-hidden');
    renderProductGallery(galleryContainer, items, openProductModal);
  } else {
    galleryContainer.classList.add('is-hidden');
    tableWrapper.classList.remove('is-hidden');
    renderProductTable(tableBody, items, openProductModal);
  }
}

function recomputeAndRender() {
  appState.clampPage();
  const { items, page, totalPages } = appState.getVisiblePage();

  renderActiveView(items);
  renderPagination(paginationContainer, { page, totalPages, pageSize: appState.getPageSize() }, {
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
  });
  showResults(items.length > 0);
}

function syncAndRender({ push = false } = {}) {
  syncUrl(
    appState.getFilters(),
    appState.getPage(),
    appState.getPageSize(),
    appState.getSort(),
    appState.getView(),
    { push }
  );
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

function handleSearchChange(search) {
  appState.setFilters({ ...appState.getFilters(), search });
  appState.setPage(1);
  syncAndRender({ push: false });
}

function handleClearFilters() {
  appState.setFilters({ category: '', minPrice: null, maxPrice: null, search: '' });
  appState.setPage(1);
  syncAndRender({ push: false });
}

function handlePageSizeChange(pageSize) {
  appState.setPageSize(pageSize);
  appState.setPage(1);
  syncAndRender({ push: false });
}

function handleSortChange(sort) {
  appState.setSort(sort);
  appState.setPage(1);
  syncAndRender({ push: false });
}

function handlePageChange(page) {
  appState.setPage(page);
  syncAndRender({ push: true });
}

function handleViewChange(view) {
  appState.setView(view);
  syncAndRender({ push: false });
}

function handlePopState() {
  filtersHandle?.clearPendingDebounce();

  const { filters, page, pageSize, sort, view } = parseUrlState();
  const category = validateCategory(filters.category, appState.getCategories());

  appState.setFilters({ ...filters, category });
  appState.setPage(page);
  appState.setPageSize(pageSize);
  appState.setSort(sort);
  appState.setView(view);
  filtersHandle?.setValues(appState.getFilters());
  filtersHandle?.setSort(appState.getSort());

  recomputeAndRender();
}

async function loadProducts() {
  if (isFetching) return;
  isFetching = true;
  setRetryDisabled(true);
  showLoading();

  try {
    const products = await fetchProducts();
    appState.setProducts(products);

    const { filters, page, pageSize, sort, view } = parseUrlState();
    const category = validateCategory(filters.category, appState.getCategories());
    appState.setFilters({ ...filters, category });
    appState.setPage(page);
    appState.setPageSize(pageSize);
    appState.setSort(sort);
    appState.setView(view);

    if (!filtersHandle) {
      filtersHandle = mountFilters(filtersContainer, appState.getCategories(), appState.getFilters(), appState.getSort(), {
        onCategoryChange: handleCategoryChange,
        onPriceChange: handlePriceChange,
        onSearchChange: handleSearchChange,
        onClearFilters: handleClearFilters,
        onSortChange: handleSortChange,
      });
    } else {
      filtersHandle.setValues(appState.getFilters());
      filtersHandle.setSort(appState.getSort());
    }

    syncAndRender({ push: false });
  } catch (error) {
    console.error('Failed to load products:', error);
    showError('Nie udało się wczytać produktów. Sprawdź połączenie z internetem i spróbuj ponownie.');
  } finally {
    isFetching = false;
    setRetryDisabled(false);
  }
}

initModal();
initStatusViews({ onRetry: loadProducts });
initThemeToggle(themeToggleBtn);
onUrlNavigated(handlePopState);
viewTableBtn.addEventListener('click', () => handleViewChange('table'));
viewGalleryBtn.addEventListener('click', () => handleViewChange('gallery'));
loadProducts().finally(hidePageLoader);

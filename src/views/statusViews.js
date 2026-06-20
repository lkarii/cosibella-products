let loadingEl;
let errorBannerEl;
let errorMessageEl;
let retryBtn;
let emptyEl;
let tableEl;
let paginationEl;

export function initStatusViews({ onRetry }) {
  loadingEl = document.getElementById('loading-indicator');
  errorBannerEl = document.getElementById('error-banner');
  errorMessageEl = document.getElementById('error-message');
  retryBtn = document.getElementById('error-retry-btn');
  emptyEl = document.getElementById('empty-state');
  tableEl = document.getElementById('product-table');
  paginationEl = document.getElementById('pagination');

  retryBtn.addEventListener('click', onRetry);
}

export function setRetryDisabled(disabled) {
  retryBtn.disabled = disabled;
}

export function showLoading() {
  loadingEl.classList.remove('is-hidden');
  errorBannerEl.classList.add('is-hidden');
  emptyEl.classList.add('is-hidden');
  tableEl.classList.add('is-hidden');
  paginationEl.classList.add('is-hidden');
}

export function showError(message) {
  loadingEl.classList.add('is-hidden');
  errorMessageEl.textContent = message;
  errorBannerEl.classList.remove('is-hidden');
  emptyEl.classList.add('is-hidden');
  tableEl.classList.add('is-hidden');
  paginationEl.classList.add('is-hidden');
}

export function showResults(hasItems) {
  loadingEl.classList.add('is-hidden');
  errorBannerEl.classList.add('is-hidden');

  emptyEl.classList.toggle('is-hidden', hasItems);
  tableEl.classList.toggle('is-hidden', !hasItems);
  paginationEl.classList.toggle('is-hidden', !hasItems);
}

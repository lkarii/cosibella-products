const PAGE_SIZE_OPTIONS = [5, 10, 20];

export function renderPagination(container, { page, totalPages, pageSize }, handlers) {
  container.innerHTML = '';

  const pageSizeGroup = document.createElement('div');
  pageSizeGroup.className = 'pagination__page-size';

  const pageSizeLabel = document.createElement('label');
  pageSizeLabel.htmlFor = 'page-size-select';
  pageSizeLabel.textContent = 'Na stronie';

  const pageSizeSelect = document.createElement('select');
  pageSizeSelect.id = 'page-size-select';

  PAGE_SIZE_OPTIONS.forEach((size) => {
    const option = document.createElement('option');
    option.value = String(size);
    option.textContent = String(size);
    pageSizeSelect.append(option);
  });

  pageSizeSelect.value = String(pageSize);
  pageSizeSelect.addEventListener('change', () => {
    handlers.onPageSizeChange(Number(pageSizeSelect.value));
  });

  pageSizeGroup.append(pageSizeLabel, pageSizeSelect);

  const controls = document.createElement('div');
  controls.className = 'pagination__controls';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'pagination__arrow';
  prevBtn.setAttribute('aria-label', 'Poprzednia strona');
  prevBtn.textContent = '←';
  prevBtn.disabled = page <= 1;
  prevBtn.addEventListener('click', () => handlers.onPageChange(page - 1));

  const pagesList = document.createElement('div');
  pagesList.className = 'pagination__pages';

  for (let i = 1; i <= totalPages; i += 1) {
    const pageBtn = document.createElement('button');
    pageBtn.type = 'button';
    pageBtn.className = 'pagination__page-btn';
    pageBtn.textContent = String(i);

    if (i === page) {
      pageBtn.classList.add('pagination__page-btn--active');
      pageBtn.setAttribute('aria-current', 'page');
    }

    pageBtn.addEventListener('click', () => handlers.onPageChange(i));
    pagesList.append(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'pagination__arrow';
  nextBtn.setAttribute('aria-label', 'Następna strona');
  nextBtn.textContent = '→';
  nextBtn.disabled = page >= totalPages;
  nextBtn.addEventListener('click', () => handlers.onPageChange(page + 1));

  controls.append(prevBtn, pagesList, nextBtn);
  container.append(pageSizeGroup, controls);
}

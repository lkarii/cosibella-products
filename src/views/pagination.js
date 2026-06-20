export function renderPagination(container, { page, totalPages }, onPageChange) {
  container.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'pagination__nav-btn';
  prevBtn.textContent = 'Poprzednia';
  prevBtn.disabled = page <= 1;
  prevBtn.addEventListener('click', () => onPageChange(page - 1));

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

    pageBtn.addEventListener('click', () => onPageChange(i));
    pagesList.append(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'pagination__nav-btn';
  nextBtn.textContent = 'Następna';
  nextBtn.disabled = page >= totalPages;
  nextBtn.addEventListener('click', () => onPageChange(page + 1));

  container.append(prevBtn, pagesList, nextBtn);
}

const CART_ICON = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3.86403 16.455C3.00603 13.023 2.57703 11.308 3.47803 10.154C4.37903 9 6.14803 9 9.68503 9H14.315C17.853 9 19.621 9 20.522 10.154C21.423 11.308 20.994 13.024 20.136 16.455C19.59 18.638 19.318 19.729 18.504 20.365C17.69 21 16.565 21 14.315 21H9.68503C7.43503 21 6.31003 21 5.49603 20.365C4.68203 19.729 4.40903 18.638 3.86403 16.455Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M19.5 9.5L18.79 6.895C18.516 5.89 18.379 5.388 18.098 5.009C17.8178 4.63246 17.4373 4.3424 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5L5.21 6.895C5.484 5.89 5.621 5.388 5.902 5.009C6.18218 4.63246 6.56269 4.3424 7 4.172C7.44 4 7.96 4 9 4" stroke="currentColor" stroke-width="1.5"/>
    <path d="M9 4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4C15 4.26522 14.8946 4.51957 14.7071 4.70711C14.5196 4.89464 14.2652 5 14 5H10C9.73478 5 9.48043 4.89464 9.29289 4.70711C9.10536 4.51957 9 4.26522 9 4Z" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 13V17M16 13V17M12 13V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const WAITING_LIST_ICON = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 10L12 12V7M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

export function createStockAction(stock) {
  const label = stock ? 'Do koszyka' : 'Lista oczekujących';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'stock-action';
  button.title = label;
  button.setAttribute('aria-label', label);
  button.innerHTML = stock ? CART_ICON : WAITING_LIST_ICON;

  button.addEventListener('click', (event) => event.stopPropagation());
  button.addEventListener('keydown', (event) => event.stopPropagation());

  return button;
}

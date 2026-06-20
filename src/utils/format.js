const priceFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
});

export function formatPrice(price) {
  return priceFormatter.format(price);
}

export function formatStock(stock) {
  return stock ? 'Dostępny' : 'Niedostępny';
}

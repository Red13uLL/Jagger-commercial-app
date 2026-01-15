export const formatPrice = (
  value,
  { locale = 'en-US', currency = 'USD', currencyDisplay = 'symbol' } = {}
) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay
  }).format(value);

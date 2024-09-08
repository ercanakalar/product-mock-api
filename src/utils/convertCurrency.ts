const convertCurrencyTr = (price: number) => {
  const formattedPrice = price.toLocaleString('tr-TR', {
    maximumFractionDigits: 0,
  });
  return `${formattedPrice} ₺`;
};

export default convertCurrencyTr;

export const convertToMoney = (
  amount: number,
  currency: string,
  minorUnit: number = 2
) => {
  let value = 0;
  if (amount && amount !== 0) {
    value = amount / Math.pow(10, minorUnit);
  }
  return value.toLocaleString('pt-br', { style: 'currency', currency });
};

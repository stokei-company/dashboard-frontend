export const convertToAmount = (amount: number, minorUnit: number = 2) => {
  const value = parseFloat((amount + '').replace(/\D/g, ''));
  if (value > 0) {
    return value;
  }
  return value;
};

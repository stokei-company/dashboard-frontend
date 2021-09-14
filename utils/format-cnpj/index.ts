export const formatCnpj = (cnpj: string): string => {
  if (cnpj.length > 18) {
    return cnpj.slice(0, 18);
  }
  // 00.000.000/0000-00
  return cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};

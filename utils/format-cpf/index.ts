export const formatCpf = (cpf: string): string => {
  if (cpf.length >= 14) {
    return cpf.slice(0, 14);
  }
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

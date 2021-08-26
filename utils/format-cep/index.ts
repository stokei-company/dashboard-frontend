export const formatCep = (value: string): string => {
  let response = value.replace(/\D/g, '');
  if (response.length > 5) {
    response = response.replace(/^(\d{0,5})(\d{0,3}).*/, '$1-$2');
  }
  return response;
};

export const formatAppNickname = (value: string): string => {
  const nicknameFormated = (value || '')
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-zA-Z-]/g, '');
  return nicknameFormated;
};

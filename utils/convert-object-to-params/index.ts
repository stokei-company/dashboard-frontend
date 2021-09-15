export const convertObjectToParams = (data: any) => {
  const dataParams = Object.entries(data || {});
  let params = '';
  if (dataParams?.length > 0) {
    params = dataParams
      .map(([key, value]) => `${key}=${value || ''}`)
      .join('&');
  }
  return {
    exists: dataParams?.length > 0,
    params
  };
};

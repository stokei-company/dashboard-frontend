import reactHTMLParser from 'react-html-parser';

export const convertStringToHTML = (value: string) => {
  if (!value) {
    return;
  }
  const content = reactHTMLParser(value);
  if (!content?.length) {
    return;
  }
  return content;
};

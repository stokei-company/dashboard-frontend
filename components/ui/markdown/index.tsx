import { Box } from '@chakra-ui/react';
import React, { memo, useMemo } from 'react';
import { convertStringToHTML } from '~/utils/convert-string-to-html';
import styles from './markdown.module.css';

interface MarkdownProps {
  readonly content: string;
}

export const Markdown: React.FC<MarkdownProps> = memo(({ content }) => {
  const htmlContent = useMemo(() => {
    const value = convertStringToHTML(content);
    return value;
  }, [content]);

  return (
    <Box
      className={styles['markdown-body']}
      width="full"
      maxWidth="full"
      isTruncated
    >
      {htmlContent}
    </Box>
  );
});
Markdown.displayName = 'Markdown';

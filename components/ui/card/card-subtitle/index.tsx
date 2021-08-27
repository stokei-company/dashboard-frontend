import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

export interface CardSubtitleProps {}

export const CardSubtitle: React.FC<CardSubtitleProps> = ({ children }) => {
  return typeof children === 'string' ? (
    <Text fontSize="sm" color="gray.500" lineHeight="shorter">
      {children}
    </Text>
  ) : (
    <Flex>{children}</Flex>
  );
};

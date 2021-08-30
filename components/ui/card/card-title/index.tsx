import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

export interface CardTitleProps {}

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return typeof children === 'string' ? (
    <Heading size="sm" lineHeight="shorter">
      {children}
    </Heading>
  ) : (
    <Flex>{children}</Flex>
  );
};

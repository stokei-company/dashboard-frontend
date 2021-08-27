import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';

export interface CardFooterProps {}

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" width="full">
      {children}
    </Flex>
  );
};

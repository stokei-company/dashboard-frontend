import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {}

export const NoSubscription: React.FC<Props> = ({ ...props }) => {
  return (
    <Flex justifyContent="center" flexDir="column">
      <Text>Nenhuma assinatura encontrada.</Text>
    </Flex>
  );
};

import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {}

export const NoPlans: React.FC<Props> = ({ ...props }) => {
  return (
    <Flex justifyContent="center" flexDir="column">
      <Text>Nenhum plano encontrado.</Text>
    </Flex>
  );
};

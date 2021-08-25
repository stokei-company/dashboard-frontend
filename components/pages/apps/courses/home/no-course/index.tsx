import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {}

export const NoCourse: React.FC<Props> = ({ ...props }) => {
  return (
    <Flex width="full" flexDir="column">
      <Text size="md" lineHeight="shorter">
        Nenhum curso encontrado.
      </Text>
    </Flex>
  );
};

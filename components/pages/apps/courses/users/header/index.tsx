import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

interface Props {
  readonly title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <Flex width="full" marginBottom={10}>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
    </Flex>
  );
};

export default Header;

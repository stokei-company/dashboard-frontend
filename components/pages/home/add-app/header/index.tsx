import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { BackLink } from '~/components/ui/back-link';

interface Props {
  readonly title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <Flex width="full" flexDir="column" marginBottom={5}>
      <Flex width="full" marginBottom={5}>
        <BackLink href="/" title="Aplicações" />
      </Flex>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
    </Flex>
  );
};

export default Header;

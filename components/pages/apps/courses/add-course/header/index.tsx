import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useContext } from 'react';
import { BackLink } from '~/components/ui/back-link';
import { AppContext } from '~/contexts/app';

interface Props {
  readonly title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  const { baseUrl } = useContext(AppContext);
  return (
    <Flex width="full" flexDir="column" marginBottom={5}>
      <Flex width="full" marginBottom={5}>
        <BackLink href={baseUrl + '/courses'} title="Cursos" />
      </Flex>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
    </Flex>
  );
};

export default Header;

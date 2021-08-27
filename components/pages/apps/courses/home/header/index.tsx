import { Flex, Heading, Spacer, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Button } from '~/components/ui/button';
import { AppContext } from '~/contexts/app';

interface Props {
  readonly title: string;
  readonly hideActions?: boolean;
}

export const Header: React.FC<Props> = ({ title, hideActions = false }) => {
  const { baseUrl } = useContext(AppContext);
  const router = useRouter();

  return (
    <Flex alignItems="flex-start" justifyContent="center" marginBottom={5}>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
      <Spacer />
      {!hideActions && (
        <Stack>
          <Button onClick={() => router.push(baseUrl + '/courses/add')}>
            Adicionar Curso
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default Header;

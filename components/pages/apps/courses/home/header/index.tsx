import { Flex, Heading, Spacer, Stack, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useContext } from 'react';
import { Button } from '~/components/ui/button';
import { AppContext } from '~/contexts/app';
import { AddCourse } from '../add-course';

interface Props {
  readonly title: string;
  readonly hideActions?: boolean;
}

export const Header: React.FC<Props> = ({ title, hideActions = false }) => {
  const { app } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const router = useRouter();

  return (
    <Flex alignItems="flex-start" justifyContent="center" marginBottom={5}>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
      <Spacer />
      {!hideActions && (
        <Stack>
          <AddCourse
            firstField={firstField}
            appId={app?.id}
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={() => router.reload()}
          />
          <Button onClick={() => onOpen()}>Adicionar Curso</Button>
        </Stack>
      )}
    </Flex>
  );
};

export default Header;

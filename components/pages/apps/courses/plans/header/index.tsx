import {
  Badge,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { AddPlan } from '../add-plan';

const status = {
  default: 'Todos',
  canceled: 'Cancelados',
  available: 'Ativos',
  paused: 'Pausados'
};

interface Props {
  readonly title: string;
  readonly courseId: string;
  readonly appId: string;
}

export const Header: React.FC<Props> = ({ title, courseId, appId }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const query = router?.query;

  const statusFormatted = useMemo(() => {
    return status[query.status + ''] || status.default;
  }, [query]);

  return (
    <Stack
      direction={['column', 'column', 'row', 'row']}
      alignItems="flex-start"
      justifyContent="center"
      marginBottom={10}
    >
      <Stack
        direction={['column', 'column', 'row', 'row']}
        spacing={[2, 2, 5, 5]}
        align={['flex-start', 'flex-start', 'center', 'center']}
      >
        <Heading size="xl" lineHeight="shorter">
          {title}
          {statusFormatted && (
            <Badge
              colorScheme="gray"
              fontSize="0.4em"
              paddingX={2}
              paddingTop={2}
              paddingBottom={1.5}
              alignContent="center"
              lineHeight="shorter"
              marginLeft={[0, 0, 5, 5]}
            >
              {statusFormatted}
            </Badge>
          )}
        </Heading>
      </Stack>
      <Spacer />
      <Stack
        direction={['column', 'column', 'row', 'row']}
        spacing={[2, 2, 10, 10]}
      >
        <AddPlan
          courseId={courseId}
          firstField={firstField}
          appId={appId}
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={() => router.reload()}
        />
        <Flex>
          <Button onClick={() => onOpen()}>Criar plano</Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Header;

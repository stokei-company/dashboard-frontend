import {
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useContext } from 'react';
import { PlusIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import Select from '~/components/ui/select';
import { CourseContext } from '~/contexts/course';
import { AddCourseSubscription } from '../add-subscription';

interface Props {
  readonly title: string;
  readonly onSuccess: () => any;
}

export const Header: React.FC<Props> = ({ title, onSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { baseUrl } = useContext(CourseContext);
  const firstField = React.useRef();
  const router = useRouter();

  const handleStatus = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      router.push(baseUrl + `/subscriptions?status=${e?.target?.value}`);
    },
    [baseUrl, router]
  );

  return (
    <Flex alignItems="flex-start" justifyContent="center" marginBottom={10}>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
      <Spacer />
      <Stack
        direction={['column', 'column', 'row', 'row']}
        spacing={[2, 2, 10, 10]}
      >
        <Flex>
          <Select
            onChange={handleStatus}
            defaultValue={router?.query?.status}
            borderRadius="full"
          >
            <option value="">Status</option>
            <option value="">Todos</option>
            <option value="available">Ativos</option>
            <option value="canceled">Cancelados</option>
            <option value="finished">Finalizados</option>
            <option value="pending">Pendentes</option>
          </Select>
        </Flex>
        <Flex>
          <Button onClick={() => onOpen()} leftIcon={<Icon as={PlusIcon} />}>
            Adicionar
          </Button>
        </Flex>
        <AddCourseSubscription
          isOpen={isOpen}
          onSuccess={onSuccess}
          onClose={onClose}
          firstField={firstField}
        />
      </Stack>
    </Flex>
  );
};

export default Header;

import { Flex, Heading, Text } from '@chakra-ui/react';
import router from 'next/router';
import { Button } from '~/components/ui/button';

interface AddAppProps {}

const ADD_APP_URL = '/apps/add';

export const AddAppBox: React.FC<AddAppProps> = ({ ...props }) => {
  return (
    <Flex flexDir="column">
      <Flex width="full" flexDir="column" marginBottom={2}>
        <Heading
          textAlign="center"
          fontSize={['lg', 'lg', '2xl', '2xl']}
          lineHeight="shorter"
        >
          Empreenda você também!
        </Heading>
      </Flex>
      <Flex width="full" flexDir="column" marginBottom={5}>
        <Text
          textAlign="center"
          fontSize={['sm', 'sm', 'md', 'md']}
          lineHeight="shorter"
        >
          Crie sua aplicação e comece a vender.
        </Text>
      </Flex>
      <Flex width="full" flexDir="row" justifyContent="center">
        <Button onClick={() => router.push(ADD_APP_URL)}>
          Criar aplicação
        </Button>
      </Flex>
    </Flex>
  );
};

export const AddAppCard: React.FC<AddAppProps> = ({ ...props }) => {
  return (
    <Flex
      width="full"
      height="full"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex width="full" flexDir="column" marginBottom={5}>
        <Heading
          textAlign="center"
          fontSize={['lg', 'lg', 'xl', 'xl']}
          lineHeight="shorter"
        >
          Crie uma nova aplicação
        </Heading>
      </Flex>
      <Flex width="full" flexDir="row" justifyContent="center">
        <Button onClick={() => router.push(ADD_APP_URL)}>Criar</Button>
      </Flex>
    </Flex>
  );
};

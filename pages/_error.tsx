import { Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';

export default function Home({ ...props }) {
  return (
    <Layout>
      <Container alignItems="center" justifyContent="center" paddingY={50}>
        <Flex flexDirection="column">
          <Heading
            textAlign="center"
            size="xl"
            lineHeight="shorter"
            marginBottom="6"
          >
            Ooops!
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Estamos com problemas, mas já estamos resolvendo.
          </Text>
        </Flex>
      </Container>
    </Layout>
  );
}

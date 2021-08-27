import { Box } from '@chakra-ui/react';
import { Layout } from '~/components/layouts/apps/layout';
import { Container } from '~/components/layouts/container';

export default function Home({ app, ...props }) {
  return (
    <Layout>
      <Container paddingY={8}>
        <Box
          width="100%"
          backgroundColor="white"
          borderRadius="md"
          padding={16}
        >
          Sobre o app
        </Box>
      </Container>
    </Layout>
  );
}

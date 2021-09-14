import { Flex } from '@chakra-ui/react';
import router from 'next/router';
import { FormAddApp } from '~/components/forms/form-add-app';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { Header } from '~/components/pages/home/add-app/header';

export default function Home({ ...props }) {
  return (
    <Layout>
      <Container paddingY={8}>
        <Flex
          width="full"
          flexDirection="column"
          backgroundColor="white"
          borderRadius="sm"
          padding={5}
        >
          <Header title="Criando sua aplicação" />
          <FormAddApp onSuccess={() => router.reload()} />
        </Flex>
      </Container>
    </Layout>
  );
}

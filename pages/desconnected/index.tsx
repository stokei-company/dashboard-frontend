import { Flex, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import { useCallback, useContext, useEffect } from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/layout';
import { Button } from '~/components/ui/button';
import { AuthContext } from '~/contexts/auth';
import { AUTH_FRONTEND_URL } from '~/environments';
import { MeServiceRest } from '~/services/rest-api/services/me/me.service';
import { mountUri } from '~/utils/uri/mount-uri';

export default function Home({ ...props }) {
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      router.replace('/');
    }
  }, [authenticated]);

  const redirectUrl = useCallback(async () => {
    let values = window.location.href.split('/');
    await values.pop();
    const redirectUri = values.join('/');
    const href = await mountUri(AUTH_FRONTEND_URL, [
      {
        key: 'redirectUri',
        value: redirectUri
      }
    ]);
    window.location.href = href;
  }, []);

  return (
    <Layout>
      <Container>
        <Flex
          paddingY={50}
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading size="xl" lineHeight="shorter">
            Você está desconectado!
          </Heading>
          <Text size="lg" marginBottom={7}>
            Volte para pagina inicial e faça login.
          </Text>
          <Button onClick={() => redirectUrl()}>Pagina inicial</Button>
        </Flex>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const meService = new MeServiceRest({ context });
  if (meService.accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
};

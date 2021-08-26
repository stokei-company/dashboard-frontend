import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Layout } from '~/components/layouts/apps/layout';
import { Container } from '~/components/layouts/container';
import { AppServiceRest } from '~/services/rest-api/services/app/app.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ app, ...props }) {
  return (
    <Layout>
      <Container justifyContent="center" paddingTop={10} paddingBottom={16}>
        <Box
          width="full"
          backgroundColor="white"
          borderRadius="md"
          padding={10}
        >
          Alguns gráficos muito tops!
        </Box>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appService = new AppServiceRest({ context });

  if (!appService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(appService.appId),
        permanent: false
      }
    };
  }

  if (appService.appId) {
    const app = await appService.loadInfos();
    if (app) {
      return {
        props: {
          app
        }
      };
    }
  }

  return {
    notFound: true
  };
};

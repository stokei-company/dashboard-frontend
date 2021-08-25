import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { ListApps } from '~/components/pages/home/list-apps';
import { MenuItemData } from '~/contexts/menu';
import { AppModel } from '~/services/@types/app';
import { AppServiceRest } from '~/services/rest-api/services/app/app.service';

interface Props {
  readonly apps: AppModel[];
}

export default function Home({ apps, ...props }: Props) {
  return (
    <Layout>
      <Container paddingTop={10} paddingBottom={16}>
        <Flex flexDir="column">
          <ListApps apps={apps} />
        </Flex>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appService = new AppServiceRest({ context });
  const accessToken = appService.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/desconnected',
        permanent: false
      }
    };
  }

  const apps = await appService.findAll();
  return {
    props: {
      apps
    }
  };
};

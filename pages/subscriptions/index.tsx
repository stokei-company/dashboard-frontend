import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { Header } from '~/components/pages/subscriptions/header';
import { ListSubscriptions } from '~/components/pages/subscriptions/list-subscriptions';
import { SubscriptionModel } from '~/services/@types/subscription';
import { clientRestApi } from '~/services/rest-api';
import { desconnectedUrl } from '~/utils/constants';

interface Props {
  readonly subscriptions: SubscriptionModel[];
}

export default function Home({ subscriptions, ...props }: Props) {
  return (
    <Layout>
      <Container flexDir="column" paddingY={8}>
        <Header title="Assinaturas" />
        <ListSubscriptions subscriptions={subscriptions} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const meService = clientRestApi({ context }).me();
  if (!meService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(meService.appId),
        permanent: false
      }
    };
  }
  const status = context?.query?.status ? context?.query?.status + '' : '';
  const page = context?.query?.page ? context?.query?.page + '' : '0';
  const subscriptions = await meService.subscriptions({}).findAll({
    status: `${status}:desc`,
    createdAt: `:desc`,
    page
  });
  return {
    props: {
      subscriptions: subscriptions?.items || []
    }
  };
};

import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { Header } from '~/components/pages/subscriptions/header';
import { ListSubscriptions } from '~/components/pages/subscriptions/list-subscriptions';
import { SubscriptionModel } from '~/services/@types/subscription';
import { MeServiceRest } from '~/services/rest-api/services/me/me.service';
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
  const meService = new MeServiceRest({ context });
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
  const subscriptions = await meService.subscriptions({
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

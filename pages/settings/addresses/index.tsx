import { GetServerSideProps } from 'next';
import { Layout } from '~/components/layouts/settings/layout';
import { ListAddresses } from '~/components/pages/settings/addresses/list-addresses';
import { AddressModel } from '~/services/@types/address';
import { UserModel } from '~/services/@types/user';
import { MeServiceRest } from '~/services/rest-api/services/me/me.service';
import { desconnectedUrl } from '~/utils/constants';

interface Props {
  readonly user: UserModel;
  readonly addresses: AddressModel[];
}

export default function Home({ user, addresses, ...props }: Props) {
  return (
    <Layout user={user}>
      <ListAddresses addresses={addresses} />
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

  const user = await meService.load();
  if (!user) {
    return {
      redirect: {
        destination: desconnectedUrl(meService.appId),
        permanent: false
      }
    };
  }
  return {
    props: {
      user,
      addresses: []
    }
  };
};

import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { FormUpdateAccountAvatar } from '~/components/forms/form-update-account-avatar';
import { Layout } from '~/components/layouts/settings/layout';
import { UserModel } from '~/services/@types/user';
import { MeServiceRest } from '~/services/rest-api/services/me/me.service';
import { desconnectedUrl } from '~/utils/constants';

interface Props {
  readonly user: UserModel;
}

export default function Home({ user, ...props }: Props) {
  return (
    <Layout user={user}>
      <FormUpdateAccountAvatar user={user} onSuccess={() => Router.reload()} />
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
      user
    }
  };
};

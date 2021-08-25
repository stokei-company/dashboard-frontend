import { Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { UserModel } from '~/services/@types/user';
import { MeServiceRest } from '~/services/rest-api/services/me/me.service';
import { appDesconnectedUrl } from '~/utils/constants';

interface Props {
  readonly user: UserModel;
}

export default function Home({ user, ...props }: Props) {
  return (
    <Layout>
      <Container flexDir="column" paddingY={8}>
        <Heading>Olá, {user?.fullname}.</Heading>
        Configurações do Usuário
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const meService = new MeServiceRest({ context });
  if (!meService.accessToken) {
    return {
      redirect: {
        destination: appDesconnectedUrl(meService.appId),
        permanent: false
      }
    };
  }

  const user = await meService.load();
  return {
    props: {
      user
    }
  };
};

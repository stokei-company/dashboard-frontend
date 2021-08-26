import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/users/header';
import { ListUsers } from '~/components/pages/apps/courses/users/list-users';
import { NoUser } from '~/components/pages/apps/courses/users/no-users';
import { CourseUserServiceRest } from '~/services/rest-api/services/course-user/course-user.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ users, ...props }) {
  const router = useRouter();

  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Header onSuccess={() => router.reload()} title="Alunos" />
        {users && users.length > 0 ? <ListUsers users={users} /> : <NoUser />}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : null;

  const courseUserService = new CourseUserServiceRest({ context, courseId });
  const appId = courseUserService.appId;

  if (!courseId || !appId) {
    return {
      notFound: true
    };
  }

  if (!courseUserService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(appId),
        permanent: false
      }
    };
  }

  const status = context?.query?.status ? context?.query?.status + '' : null;
  const users = await courseUserService.findAll({ filter: { status } });
  return {
    props: {
      users: users?.items,
      courseId,
      appId
    }
  };
};

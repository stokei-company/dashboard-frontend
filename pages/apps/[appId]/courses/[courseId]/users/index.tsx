import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/users/header';
import { ListUsers } from '~/components/pages/apps/courses/users/list-users';
import { NoUser } from '~/components/pages/apps/courses/users/no-users';
import { CourseUserServiceRest } from '~/services/rest-api/services/course-user/course-user.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ users, ...props }) {
  return (
    <Layout>
      <Container paddingY={10} flexDir="column">
        <Header title="Alunos" />
        {users?.length > 0 ? <ListUsers users={users} /> : <NoUser />}
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

  const users = await courseUserService.findAll();
  return {
    props: {
      users: users?.items || [],
      courseId,
      appId
    }
  };
};

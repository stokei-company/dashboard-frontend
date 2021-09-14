import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/subscriptions/header';
import { ListSubscriptions } from '~/components/pages/apps/courses/subscriptions/list-subscriptions';
import { clientRestApi } from '~/services/rest-api';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ subscriptions, ...props }) {
  const router = useRouter();

  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Header onSuccess={() => router.reload()} title="Assinaturas" />
        <ListSubscriptions subscriptions={subscriptions} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : null;

  const courseService = clientRestApi({
    context
  }).courses();

  const appId = courseService.appId;

  if (!courseId || !appId) {
    return {
      notFound: true
    };
  }

  if (!courseService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(appId),
        permanent: false
      }
    };
  }

  const status = context?.query?.status ? context?.query?.status + '' : null;
  const subscriptions = await courseService
    .subscriptions({ courseId })
    .findAll({
      status: `${status}:desc`,
      createdAt: ':desc'
    });
  return {
    props: {
      subscriptions: subscriptions?.items || [],
      courseId,
      appId
    }
  };
};

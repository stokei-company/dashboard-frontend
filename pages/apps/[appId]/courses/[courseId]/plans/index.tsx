import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/plans/header';
import ListPlans from '~/components/pages/apps/courses/plans/list-plans';
import { CourseSkuServiceRest } from '~/services/rest-api/services/course-sku/course-sku.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ plans, appId, courseId, ...props }) {
  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Header appId={appId} courseId={courseId} title="Planos" />
        <Flex flexDir="column">
          <ListPlans appId={appId} courseId={courseId} plans={plans} />
        </Flex>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : null;

  const courseSkuService = new CourseSkuServiceRest({ context, courseId });
  const appId = courseSkuService.appId;
  const accessToken = courseSkuService.accessToken;
  if (!accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(appId),
        permanent: false
      }
    };
  }
  const query = context.query;
  const plans = await courseSkuService.findAll({
    name: ':asc',
    status: `${query?.status ? query?.status + '' : ''}:asc`
  });
  return {
    props: {
      plans: plans?.items || [],
      courseId,
      appId
    }
  };
};

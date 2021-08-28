import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/pages/courses/layout';
import { Header } from '~/components/pages/courses/modules/header';
import { ListModules } from '~/components/pages/courses/modules/list-modules';
import { CourseModuleServiceRest } from '~/services/rest-api/services/course-module/course-module.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ modules, courseId, ...props }) {
  return (
    <Layout>
      <Container flex="1" paddingY={8} flexDir="column">
        <Header title="Módulos" />
        <ListModules modules={modules} openAll />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : '';

  const moduleService = new CourseModuleServiceRest({ context, courseId });
  if (!moduleService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(moduleService.appId),
        permanent: false
      }
    };
  }

  const modules = await moduleService.findAll();
  return {
    props: {
      modules: modules || [],
      courseId
    }
  };
};

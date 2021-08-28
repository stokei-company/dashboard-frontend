import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/modules/header';
import { ListModules } from '~/components/pages/apps/courses/modules/list-modules';
import { NoModule } from '~/components/pages/apps/courses/modules/no-module';
import { CourseModuleServiceRest } from '~/services/rest-api/services/course-module/course-module.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ modules, courseId, appId, ...props }) {
  const router = useRouter();

  return (
    <Layout>
      <Container flex="1" paddingY={8} flexDir="column">
        <Header
          onSuccess={() => router.reload()}
          appId={appId}
          courseId={courseId}
          title="Módulos"
        />
        {modules && modules.length > 0 ? (
          <ListModules modules={modules} appId={appId} courseId={courseId} />
        ) : (
          <NoModule />
        )}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : null;

  const courseModuleService = new CourseModuleServiceRest({
    courseId,
    context
  });
  const appId = courseModuleService.appId;
  const accessToken = courseModuleService.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(appId),
        permanent: false
      }
    };
  }

  const modules = await courseModuleService.findAll();
  return {
    props: {
      modules: modules || [],
      courseId,
      appId
    }
  };
};

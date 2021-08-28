import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import Header from '~/components/pages/apps/courses/materials/header';
import ListMaterials from '~/components/pages/apps/courses/materials/list-materials';
import { CourseMaterialServiceRest } from '~/services/rest-api/services/course-material/course-material.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ materials, courseId, appId, ...props }) {
  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Header appId={appId} courseId={courseId} title="Materiais" />
        <ListMaterials
          appId={appId}
          courseId={courseId}
          materials={materials}
        />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : null;

  const courseMaterialService = new CourseMaterialServiceRest({
    courseId,
    context
  });
  const appId = courseMaterialService.appId;
  const accessToken = courseMaterialService.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(appId),
        permanent: false
      }
    };
  }

  const materials = await courseMaterialService.findAll();
  return {
    props: {
      materials: materials || [],
      courseId,
      appId
    }
  };
};

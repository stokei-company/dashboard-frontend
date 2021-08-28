import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/pages/courses/layout';
import { Header } from '~/components/pages/courses/materials/header';
import { ListMaterials } from '~/components/pages/courses/materials/list-materials';
import { CourseMaterialServiceRest } from '~/services/rest-api/services/course-material/course-material.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ materials, courseId, ...props }) {
  return (
    <Layout>
      <Container flex="1" paddingY={8} flexDir="column">
        <Header title="Materiais" />
        <ListMaterials materials={materials} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : '';

  const materialService = new CourseMaterialServiceRest({ context, courseId });
  if (!materialService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(materialService.appId),
        permanent: false
      }
    };
  }

  const materials = await materialService.findAll();
  return {
    props: {
      materials: materials || [],
      courseId
    }
  };
};

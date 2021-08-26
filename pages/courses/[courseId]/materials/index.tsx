import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Header } from '~/components/pages/courses/materials/header';
import { ListMaterials } from '~/components/pages/courses/materials/list-materials';
import { Layout } from '~/components/pages/courses/layout';
import { CourseMaterialServiceRest } from '~/services/rest-api/services/course-material/course-material.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ materials, courseId, ...props }) {
  return (
    <Layout>
      <Flex flex="1" paddingBottom="50" flexDir="column">
        <Header title="Materiais" />
        <ListMaterials materials={materials} />
      </Flex>
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
      materials,
      courseId
    }
  };
};

import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { FormUpdateCourse } from '~/components/forms/form-update-course';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/settings/header';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ modules, course, appId, ...props }) {
  const router = useRouter();
  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Flex
          flexDir="column"
          padding={5}
          borderRadius="sm"
          backgroundColor="white"
        >
          <Header title="Configurações" />
          <FormUpdateCourse
            appId={appId}
            course={course}
            onSuccess={() => router.reload()}
          />
        </Flex>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseService = new CourseServiceRest({ context });
  const appId = courseService.appId;
  const accessToken = courseService.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(appId),
        permanent: false
      }
    };
  }

  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : null;

  const course = await courseService.findById(courseId);
  if (!course) {
    return {
      notFound: false,
      props: {}
    };
  }

  return {
    props: {
      course,
      appId
    }
  };
};

import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Layout } from '~/components/layouts/apps/layout';
import { Container } from '~/components/layouts/container';
import { Header } from '~/components/pages/apps/courses/home/header';
import { ListCourses } from '~/components/pages/apps/courses/home/list-courses';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { appDesconnectedUrl } from '~/utils/constants';

export default function Home({ courses, appId, ...props }) {
  return (
    <Layout>
      <Container paddingTop={10} paddingBottom={16}>
        <Header appId={appId} title="Cursos" />
        <ListCourses appId={appId} courses={courses} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseService = new CourseServiceRest({ context });
  if (!courseService.accessToken) {
    return {
      redirect: {
        destination: appDesconnectedUrl(courseService.appId),
        permanent: false
      }
    };
  }

  const courses = await courseService.findAll();
  return {
    props: {
      courses,
      appId: courseService.appId
    }
  };
};

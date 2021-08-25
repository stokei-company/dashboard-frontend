import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { Header } from '~/components/pages/apps/courses/home/header';
import { ListCourses } from '~/components/pages/apps/courses/home/list-courses';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { MeServiceRest } from '~/services/rest-api/services/me/me.service';
import { appDesconnectedUrl } from '~/utils/constants';

export default function Home({ courses, ...props }) {
  return (
    <Layout>
      <Container flexDir="column" paddingY={8}>
        <Header title="Cursos" hideActions />
        <ListCourses courses={courses} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const meService = new MeServiceRest({ context });
  if (!meService.accessToken) {
    return {
      redirect: {
        destination: appDesconnectedUrl(meService.appId),
        permanent: false
      }
    };
  }

  const courses = await meService.courses();
  return {
    props: {
      courses
    }
  };
};

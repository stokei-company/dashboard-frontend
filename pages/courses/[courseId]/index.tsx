import { Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Body } from '~/components/pages/courses/about/body';
import { Footer } from '~/components/pages/courses/about/footer';
import { Header } from '~/components/pages/courses/about/header';
import { Layout } from '~/components/pages/courses/layout';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ ...props }) {
  return (
    <Layout>
      <Container paddingY={8}>
        <Stack direction="column" spacing={5}>
          <Header />
          <Body />
          <Footer />
        </Stack>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseService = new CourseServiceRest({ context });
  if (!courseService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(courseService.appId),
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

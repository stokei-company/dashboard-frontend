import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ courseId, appId, ...props }) {
  return (
    <Layout>
      <Container justifyContent="center" paddingY={10}>
        <Box
          width="100%"
          backgroundColor="white"
          borderRadius="md"
          padding={16}
        >
          ALGUNS GRAFICOS
        </Box>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseService = new CourseServiceRest({ context });
  const appId = courseService.appId;

  if (!courseService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(appId),
        permanent: false
      }
    };
  }

  const courseId = context?.params?.courseId
    ? context.params.courseId + ''
    : null;

  return {
    props: {
      appId,
      courseId
    }
  };
};

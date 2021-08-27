import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import { FormAddCourse } from '~/components/forms/form-add-course';
import { Layout } from '~/components/layouts/apps/layout';
import { Container } from '~/components/layouts/container';
import { Header } from '~/components/pages/apps/courses/add-course/header';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { desconnectedUrl } from '~/utils/constants';

export default function Home({ appId, ...props }) {
  return (
    <Layout>
      <Container paddingTop={10} paddingBottom={16}>
        <Flex
          width="full"
          flexDirection="column"
          backgroundColor="white"
          borderRadius="sm"
          padding={5}
        >
          <Header title="Criando um novo curso" />
          <FormAddCourse appId={appId} onSuccess={() => router.reload()} />
        </Flex>
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
    props: {
      appId: courseService.appId
    }
  };
};

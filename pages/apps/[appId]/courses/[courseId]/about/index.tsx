import { Flex, Heading, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useContext } from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Teacher } from '~/components/pages/courses/about/footer/teacher';
import { Card } from '~/components/ui/card';
import { Markdown } from '~/components/ui/markdown';
import { AuthContext } from '~/contexts/auth';
import { CourseModel } from '~/services/@types/course';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { desconnectedUrl } from '~/utils/constants';

interface Props {
  readonly course: CourseModel;
}

export default function Home({ course, ...props }: Props) {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <Container paddingY={10}>
        <Stack direction="column" spacing={5}>
          <Flex
            flexDirection="column"
            backgroundColor="white"
            padding={5}
            borderRadius="sm"
          >
            <Markdown content={course?.description || 'Sem descrição.'} />
          </Flex>

          <Card
            body={
              <>
                <Heading
                  fontWeight="normal"
                  size="md"
                  lineHeight="shorter"
                  marginBottom={3}
                >
                  Professores
                </Heading>
                <Stack direction="column" align="center" spacing={4}>
                  {course?.teachers.map((teacher) => (
                    <Teacher
                      key={teacher.id}
                      teacher={teacher}
                      itsMe={user?.id === teacher.id}
                    />
                  ))}
                </Stack>
              </>
            }
          />
        </Stack>
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
    ? context?.params?.courseId + ''
    : null;

  const course = await courseService.findById(courseId);

  if (!course) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      course,
      courseId,
      appId
    }
  };
};

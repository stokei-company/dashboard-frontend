import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { Container } from "~/components/layouts/container";
import { Layout } from "~/components/layouts/courses/layout";
import { Markdown } from "~/components/ui/markdown";
import { CourseModel } from "~/services/@types/course";
import { CourseServiceRest } from "~/services/rest-api/services/course/course.service";
import { appDesconnectedUrl } from "~/utils/constants";

interface Props {
  readonly course: CourseModel;
}

export default function Home({ course, ...props }: Props) {
  return (
    <Layout>
      <Container paddingY={10}>
        <Flex
          flexDirection="column"
          backgroundColor="white"
          padding={5}
          borderRadius="sm"
        >
          <Markdown content={course?.description || "Sem descrição."} />
        </Flex>
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
        destination: appDesconnectedUrl(appId),
        permanent: false,
      },
    };
  }

  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ""
    : null;

  const course = await courseService.findById(courseId);

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
      courseId,
      appId,
    },
  };
};

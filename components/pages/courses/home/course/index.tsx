import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo } from "react";
import { ButtonOutlined } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { CourseAvatar } from "~/components/ui/course-avatar";
import { CourseModel } from "~/services/@types/course";

interface Props {
  readonly course: CourseModel;
}

export const Course: React.FC<Props> = memo(({ course }) => {
  const router = useRouter();

  return (
    <Card
      title={course.name}
      avatar={<CourseAvatar size="lg" src={course.imageUrl} name={course.name} />}
      body={
        <Flex paddingTop={3}>
          <ButtonOutlined onClick={() => router.push(`/courses/${course.id}`)}>
            Acessar
          </ButtonOutlined>
        </Flex>
      }
    />
  );
});

Course.displayName = "Course";

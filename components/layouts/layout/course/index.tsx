import { Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CourseAvatar } from "~/components/ui/course-avatar";
import { CourseContext } from "~/contexts/course";
import { colors } from "~/styles/colors";

interface Props {
  readonly courseId?: string;
}

export const Course: React.FC<Props> = ({ courseId, children, ...props }) => {
  const { course, loading } = useContext(CourseContext);
  if (!course) {
    return <></>;
  }
  if (loading) {
    return (
      <Flex alignItems="center">
        <Text>Carregando...</Text>
      </Flex>
    );
  }
  return (
    <Flex alignItems="center">
      <Flex marginRight="3">
        <CourseAvatar size="sm" src={course?.imageUrl} name={course?.name} />
      </Flex>
      <Flex display={["none", "none", "block", "block"]}>
        <Text fontWeight="bold" color={colors.primary.main}>
          {course?.name}
        </Text>
      </Flex>
    </Flex>
  );
};

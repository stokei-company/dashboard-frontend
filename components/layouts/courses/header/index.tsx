import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Container } from "~/components/layouts/container";
import { CourseAvatar } from "~/components/ui/course-avatar";
import { CourseContext } from "~/contexts/course";

interface Props {}

export const Header: React.FC<Props> = ({ ...props }) => {
  const { loading, course } = useContext(CourseContext);
  return (
    <Flex
      width="full"
      alignItems="center"
      borderBottomWidth="thin"
      backgroundColor="white"
    >
      <Container paddingY={10}>
        <Stack direction="row" spacing={3} align="center">
          <CourseAvatar name={course?.name} src={course?.imageUrl} size="lg" />
          <Heading size="lg" lineHeight="shorter">
            {course?.name}
          </Heading>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Header;

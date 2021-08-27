import { Flex, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Card } from '~/components/ui/card';
import { CourseAvatar } from '~/components/ui/course-avatar';
import { CourseContext } from '~/contexts/course';

interface Props {}

export const Header: React.FC<Props> = (props) => {
  const { course } = useContext(CourseContext);
  return (
    <Card
      width="full"
      body={
        <Stack direction="row" align="center" spacing={4}>
          <Flex>
            <CourseAvatar
              size="lg"
              src={course?.imageUrl}
              name={course?.name}
            />
          </Flex>
          <Text fontSize="xl">{course?.name}</Text>
        </Stack>
      }
    />
  );
};

export default Header;

import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Card } from '~/components/ui/card';
import { UserAvatar } from '~/components/ui/user-avatar';
import { CourseContext } from '~/contexts/course';

interface Props {}

export const Footer: React.FC<Props> = (props) => {
  const { course } = useContext(CourseContext);

  return (
    <Card
      width="full"
      marginBottom={10}
      body={
        <Flex flexDirection="column">
          {course?.teachers && (
            <Heading
              fontWeight="normal"
              size="md"
              lineHeight="shorter"
              marginBottom={3}
            >
              Professores
            </Heading>
          )}
          <Stack direction="row" align="center" spacing={4}>
            {course?.teachers.map((teacher) => (
              <Flex key={teacher.id} width="full">
                <Flex>
                  <UserAvatar size="md" name={teacher?.fullname} />
                </Flex>
                <Stack direction="column" spacing={1}>
                  <Text fontSize="md" fontWeight="bold">
                    {teacher?.fullname}
                  </Text>
                </Stack>
              </Flex>
            ))}
            {course?.app && (
              <Stack direction="row" spacing={3}>
                <Image
                  height="15px"
                  src={course.app.logo}
                  fallbackSrc="/default-logo-app.png"
                  alt="logo"
                />
                <Text fontSize="xs">{course.app.name}</Text>
              </Stack>
            )}
          </Stack>
        </Flex>
      }
    />
  );
};

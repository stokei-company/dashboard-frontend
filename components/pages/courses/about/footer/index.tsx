import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AppLogo } from '~/components/ui/app-logo';
import { Card } from '~/components/ui/card';
import { UserAvatar } from '~/components/ui/user-avatar';
import { AuthContext } from '~/contexts/auth';
import { CourseContext } from '~/contexts/course';
import { Teacher } from './teacher';

interface Props {}

export const Footer: React.FC<Props> = (props) => {
  const { user } = useContext(AuthContext);
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
          <Stack direction="column" align="center" spacing={4}>
            {course?.teachers.map((teacher) => (
              <Teacher
                key={teacher.id}
                teacher={teacher}
                itsMe={user?.id === teacher.id}
              />
            ))}
          </Stack>
          {course?.app && (
            <Stack width="full" direction="row" spacing={3} marginTop={10}>
              <AppLogo height="30px" src={course.app.logo} />
              <Text fontSize="sm">{course.app.name}</Text>
            </Stack>
          )}
        </Flex>
      }
    />
  );
};

import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useContext } from 'react';
import { AppContext } from '~/contexts/app';
import { CourseModel } from '~/services/@types/course';
import { Course } from '../course';
import { NoCourse } from '../no-course';

interface Props {
  readonly courses: CourseModel[];
}

export const ListCourses: React.FC<Props> = ({ courses }) => {
  const { app } = useContext(AppContext);
  return (
    <Flex width="full">
      {courses?.length > 0 ? (
        <SimpleGrid width="full" spacing="10" columns={[1, 2, 2, 3]}>
          {courses.map((course) => (
            <Course key={course.id} appId={app?.id} course={course} />
          ))}
        </SimpleGrid>
      ) : (
        <NoCourse />
      )}
    </Flex>
  );
};

export default ListCourses;

import React, { useContext } from 'react';
import { Card } from '~/components/ui/card';
import { Markdown } from '~/components/ui/markdown';
import { CourseContext } from '~/contexts/course';

interface Props {}

export const Body: React.FC<Props> = (props) => {
  const { course } = useContext(CourseContext);
  return (
    <Card
      width="full"
      body={<Markdown content={course?.description || 'Sem descrição.'} />}
    />
  );
};

import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCourse } from '~/hooks/use-course';
import { AppModel } from '~/services/@types/app';
import { CourseModel } from '~/services/@types/course';
import { AppContext } from '../app';

export interface CourseContextValues {
  readonly app: AppModel;
  readonly course: CourseModel;
  readonly setCourseImageUrl: (data: string) => void;
  readonly baseUrl: string;
  readonly baseCourseUrl: string;
  readonly loading: boolean;
}

interface Props {}

export const CourseContext = React.createContext<CourseContextValues>(
  {} as CourseContextValues
);

export const CourseContextProvider: React.FC<Props> = ({ children }) => {
  const [_course, setCourse] = useState<CourseModel>();
  const router = useRouter();
  const { app } = useContext(AppContext);
  const { course, loading } = useCourse({
    courseId: router?.query?.courseId,
    appId: router?.query?.appId
  });
  const baseUrl = `/apps/${router?.query?.appId}/courses/${router?.query?.courseId}`;
  const baseCourseUrl = `/courses/${router?.query?.courseId}`;

  useEffect(() => {
    setCourse(course);
  }, [course]);

  const setCourseImageUrl = (url: string) => {
    setCourse((prev) => ({ ...prev, imageUrl: url }));
  };

  return (
    <CourseContext.Provider
      value={{
        app,
        course: _course,
        setCourseImageUrl,
        loading,
        baseUrl,
        baseCourseUrl
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContextProvider;

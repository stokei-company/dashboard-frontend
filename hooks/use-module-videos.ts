import { useEffect } from 'react';
import { VideoModel } from '~/services/@types/video';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { CourseVideoServiceRest } from '~/services/rest-api/services/course-video/course-video.service';
import { useRequest } from './use-request';

export interface UseModuleVideosResponse {
  readonly loading: boolean;
  readonly videos: FindAllPayload<VideoModel>;
}

export const useModuleVideos = ({
  appId,
  moduleId
}): UseModuleVideosResponse => {
  const courseService = new CourseVideoServiceRest({
    appId,
    moduleId
  });
  const { data, loading, submit } = useRequest({
    submit: () =>
      courseService.findAll({
        title: ':asc',
        position: ':asc'
      })
  });

  useEffect(() => {
    (async () => {
      try {
        if (moduleId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [moduleId]);

  return {
    videos: data,
    loading
  };
};

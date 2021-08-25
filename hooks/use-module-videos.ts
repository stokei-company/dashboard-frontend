import { useEffect } from "react";
import { VideoModel } from "~/services/@types/video";
import { CourseVideoServiceRest } from "~/services/rest-api/services/course-video/course-video.service";
import { useRequest } from "./use-request";

export interface UseModuleVideosResponse {
    readonly loading: boolean;
    readonly videos: VideoModel[];
}

export const useModuleVideos = ({ appId, moduleId }): UseModuleVideosResponse => {
    const courseService = new CourseVideoServiceRest({
        appId,
        moduleId,
    });
    const { data, loading, submit } = useRequest({
        submit: () => courseService.findAll()
    });

    useEffect(() => {
        (async () => {
            try {
                if (appId && moduleId) {
                    await submit();
                }
            } catch (error) { }
        })()
    }, [appId, moduleId]);

    return {
        videos: data,
        loading,
    };
}
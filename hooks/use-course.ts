import { useEffect } from "react";
import { CourseModel } from "~/services/@types/course";
import { CourseServiceRest } from "~/services/rest-api/services/course/course.service";
import { useRequest } from "./use-request";

export interface UseCourseResponse {
    readonly loading: boolean;
    readonly course: CourseModel;
}

export const useCourse = ({ courseId, appId }): UseCourseResponse => {
    const courseService = new CourseServiceRest({
        appId,
    });
    const { data, loading, submit } = useRequest({
        submit: () => courseService.findById(courseId)
    });

    useEffect(() => {
        (async () => {
            try {
                if (courseId && appId) {
                    await submit();
                }
            } catch (error) { }
        })()
    }, [courseId, appId]);

    return {
        course: data,
        loading,
    };
}
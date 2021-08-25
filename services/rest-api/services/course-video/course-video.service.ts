import { VideoModel } from "~/services/@types/video";
import { BaseService, BaseServiceConfig } from "../base-service";
import { CreateCourseVideoDTO } from "./dtos/create-course-video.dto";
import { UpdateCourseVideoDTO } from "./dtos/update-course-video.dto";

export interface CourseVideoServiceConfig extends BaseServiceConfig {
    readonly moduleId: string;
}

export class CourseVideoServiceRest extends BaseService {
    readonly moduleId: string;
    constructor(data: CourseVideoServiceConfig) {
        super(data);
        this.moduleId = data.moduleId;
    }

    async create(data: CreateCourseVideoDTO | FormData): Promise<VideoModel> {
        try {
            const response = await this.client.post<VideoModel>(`/modules/${this.moduleId}/videos`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            if (response?.data) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }

    async update(videoId: string, data: UpdateCourseVideoDTO | FormData): Promise<VideoModel> {
        try {
            const response = await this.client.patch<VideoModel>(`/videos/${videoId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            if (response?.data) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }

    async delete(videoId: string): Promise<VideoModel> {
        try {
            const response = await this.client.delete<VideoModel>(`/videos/${videoId}`);
            if (response?.data) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }

    async findAll(): Promise<VideoModel[]> {
        try {
            const response = await this.client.get<VideoModel[]>(`/modules/${this.moduleId}/videos`);
            if (response?.data && response?.data.length > 0) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }
}
import { CourseModel } from "~/services/@types/course";
import { BaseService, BaseServiceConfig } from "../base-service";
import { CreateCourseDTO } from "./dtos/create-course.dto";
import { UpdateCourseDTO } from "./dtos/update-course.dto";

export interface CourseServiceConfig extends BaseServiceConfig { }

export class CourseServiceRest extends BaseService {
    constructor(data: CourseServiceConfig) {
        super(data);
    }

    async create(data: CreateCourseDTO | FormData): Promise<CourseModel> {
        try {
            const response = await this.client.post<CourseModel>(`/courses`, data, {
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

    async update(courseId: string, data: UpdateCourseDTO | FormData): Promise<boolean> {
        try {
            const response = await this.client.patch<{ ok: boolean }>(`/courses/${courseId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            if (response?.data?.ok) {
                return true;
            }
        } catch (error) { }
        return false;
    }

    async findById(id: string): Promise<CourseModel> {
        try {
            const response = await this.client.get<CourseModel>(`/courses/${id}`);
            if (response?.data) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }

    async findAll(): Promise<CourseModel[]> {
        try {
            const response = await this.client.get<CourseModel[]>(`/courses`);
            if (response?.data && response?.data.length > 0) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }
}
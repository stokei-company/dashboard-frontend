import { SubscriptionModel } from "~/services/@types/subscription";
import { FindAllData } from "~/services/interfaces/find-all.data";
import { FindAllPayload } from "~/services/interfaces/find-all.payload";
import { BaseService, BaseServiceConfig } from "../base-service";
import { CreateCourseUserDTO } from "./dtos/create-course-user.dto";

export interface CourseUserServiceConfig extends BaseServiceConfig {
    readonly courseId: string;
}

export class CourseUserServiceRest extends BaseService {
    readonly courseId: string;
    constructor(data: CourseUserServiceConfig) {
        super(data);
        this.courseId = data.courseId;
    }

    async create(data: CreateCourseUserDTO): Promise<SubscriptionModel> {
        try {
            const response = await this.client.post<SubscriptionModel>(`/courses/${this.courseId}/users`, data);
            if (response?.data) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }

    async start(data: { subscriptionId: string, userId: string }): Promise<boolean> {
        try {
            const response = await this.client.patch<{ ok: boolean }>(`/courses/${this.courseId}/users/${data?.subscriptionId}/start`, data);
            if (response?.data?.ok) {
                return response?.data?.ok;
            }
        } catch (error) { }
        return null;
    }

    async cancel(data: { subscriptionId: string, userId: string }): Promise<boolean> {
        try {
            const response = await this.client.patch<{ ok: boolean }>(`/courses/${this.courseId}/users/${data?.subscriptionId}/cancel`, data);
            if (response?.data?.ok) {
                return response?.data?.ok;
            }
        } catch (error) { }
        return null;
    }

    async findAll(data?: FindAllData<{ status?: string }>): Promise<FindAllPayload<SubscriptionModel>> {
        try {
            const params = Object.entries({ ...data?.filter, ...data })
                .map(([key, value]) => `${key}=${value}`);

            const paramsString = params.join("&");
            const response = await this.client.get<FindAllPayload<SubscriptionModel>>(`/courses/${this.courseId}/users${params.length > 0 ? "?" + paramsString : ""}`);
            if (response?.data) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }
}
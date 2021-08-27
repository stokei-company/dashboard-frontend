import { SubscriptionModel } from '~/services/@types/subscription';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { BaseService, BaseServiceConfig } from '../base-service';
import { CreateCourseSubscriptionDTO } from './dtos/create-course-subscription.dto';

export interface CourseSubscriptionServiceConfig extends BaseServiceConfig {
  readonly courseId: string;
}

export class CourseSubscriptionServiceRest extends BaseService {
  readonly courseId: string;
  constructor(data: CourseSubscriptionServiceConfig) {
    super(data);
    this.courseId = data.courseId;
  }

  async create(data: CreateCourseSubscriptionDTO): Promise<SubscriptionModel> {
    try {
      const response = await this.client.post<SubscriptionModel>(
        `/courses/${this.courseId}/subscriptions`,
        data
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async start(data: {
    subscriptionId: string;
    userId: string;
  }): Promise<boolean> {
    try {
      const response = await this.client.patch<{ ok: boolean }>(
        `/courses/${this.courseId}/subscriptions/${data?.subscriptionId}/start`,
        data
      );
      if (response?.data?.ok) {
        return response?.data?.ok;
      }
    } catch (error) {}
    return null;
  }

  async cancel(data: {
    subscriptionId: string;
    userId: string;
  }): Promise<boolean> {
    try {
      const response = await this.client.patch<{ ok: boolean }>(
        `/courses/${this.courseId}/subscriptions/${data?.subscriptionId}/cancel`,
        data
      );
      if (response?.data?.ok) {
        return response?.data?.ok;
      }
    } catch (error) {}
    return null;
  }

  async findAll(data?: {
    limit?: string;
    page?: string;
    status?: string;
    type?: string;
    createdAt?: string;
  }): Promise<FindAllPayload<SubscriptionModel>> {
    try {
      const params = Object.entries(data || {}).map(
        ([key, value]) => `${key}=${value || ''}`
      );

      const paramsString = params.join('&');
      const response = await this.client.get<FindAllPayload<SubscriptionModel>>(
        `/courses/${this.courseId}/subscriptions${
          params.length > 0 ? '?' + paramsString : ''
        }`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

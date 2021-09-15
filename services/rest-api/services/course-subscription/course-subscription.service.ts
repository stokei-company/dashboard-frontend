import { SubscriptionModel } from '~/services/@types/subscription';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { convertObjectToParams } from '~/utils/convert-object-to-params';
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
  }): Promise<SubscriptionModel> {
    try {
      const response = await this.client.patch<SubscriptionModel>(
        `/courses/${this.courseId}/subscriptions/${data?.subscriptionId}/start`,
        data
      );
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {}
    return null;
  }

  async cancel(data: {
    subscriptionId: string;
    userId: string;
  }): Promise<SubscriptionModel> {
    try {
      const response = await this.client.patch<SubscriptionModel>(
        `/courses/${this.courseId}/subscriptions/${data?.subscriptionId}/cancel`,
        data
      );
      if (response?.data) {
        return response?.data;
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
      const params = convertObjectToParams(data);
      const response = await this.client.get<FindAllPayload<SubscriptionModel>>(
        `/courses/${this.courseId}/subscriptions${
          params?.exists ? '?' + params.params : ''
        }`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

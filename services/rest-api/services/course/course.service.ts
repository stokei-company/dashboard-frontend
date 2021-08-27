import { CourseModel } from '~/services/@types/course';
import { SubscriptionModel } from '~/services/@types/subscription';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { BaseService, BaseServiceConfig } from '../base-service';
import { CreateCourseDTO } from './dtos/create-course.dto';
import { UpdateCourseDTO } from './dtos/update-course.dto';

export interface CourseServiceConfig extends BaseServiceConfig {}

export class CourseServiceRest extends BaseService {
  constructor(data: CourseServiceConfig) {
    super(data);
  }

  async create(data: CreateCourseDTO | FormData): Promise<CourseModel> {
    try {
      const response = await this.client.post<CourseModel>(`/courses`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async update(
    courseId: string,
    data: UpdateCourseDTO | FormData
  ): Promise<boolean> {
    try {
      const response = await this.client.patch<{ ok: boolean }>(
        `/courses/${courseId}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response?.data?.ok) {
        return true;
      }
    } catch (error) {}
    return false;
  }

  async findById(id: string): Promise<CourseModel> {
    try {
      const response = await this.client.get<CourseModel>(`/courses/${id}`);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(): Promise<CourseModel[]> {
    try {
      const response = await this.client.get<CourseModel[]>(`/courses`);
      if (response?.data && response?.data.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async subscriptions(
    courseId: string,
    data?: {
      limit?: string;
      page?: string;
      status?: string;
      type?: string;
      createdAt?: string;
    }
  ): Promise<FindAllPayload<SubscriptionModel>> {
    try {
      const dataParams = Object.entries(data || {});
      let params = '';
      if (dataParams.length > 0) {
        params = dataParams
          .map(([key, value]) => `${key}=${value || ''}`)
          .join('&');
      }
      const response = await this.client.get<FindAllPayload<SubscriptionModel>>(
        `/courses/${courseId}/subscriptions${params ? '?' + params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

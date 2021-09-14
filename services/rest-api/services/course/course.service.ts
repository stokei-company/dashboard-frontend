import { CourseModel } from '~/services/@types/course';
import { BaseService, BaseServiceConfig } from '../base-service';
import {
  CourseMaterialServiceConfig,
  CourseMaterialServiceRest
} from '../course-material/course-material.service';
import {
  CourseModuleServiceConfig,
  CourseModuleServiceRest
} from '../course-module/course-module.service';
import {
  CourseSkuServiceConfig,
  CourseSkuServiceRest
} from '../course-sku/course-sku.service';
import {
  CourseSubscriptionServiceConfig,
  CourseSubscriptionServiceRest
} from '../course-subscription/course-subscription.service';
import {
  CourseUserServiceConfig,
  CourseUserServiceRest
} from '../course-user/course-user.service';
import {
  CourseVideoServiceConfig,
  CourseVideoServiceRest
} from '../course-video/course-video.service';
import { CreateCourseDTO } from './dtos/create-course.dto';
import { UpdateCourseDTO } from './dtos/update-course.dto';

export interface CourseServiceConfig extends BaseServiceConfig {}

export class CourseServiceRest extends BaseService {
  constructor(data: CourseServiceConfig) {
    super(data);
  }

  materials(config: CourseMaterialServiceConfig) {
    return new CourseMaterialServiceRest(config);
  }
  modules(config: CourseModuleServiceConfig) {
    return new CourseModuleServiceRest(config);
  }
  videos(config: CourseVideoServiceConfig) {
    return new CourseVideoServiceRest(config);
  }
  skus(config: CourseSkuServiceConfig) {
    return new CourseSkuServiceRest(config);
  }
  users(config: CourseUserServiceConfig) {
    return new CourseUserServiceRest(config);
  }
  subscriptions(config: CourseSubscriptionServiceConfig) {
    return new CourseSubscriptionServiceRest(config);
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
}

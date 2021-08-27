import { SkuModel } from '~/services/@types/sku';
import { BaseService, BaseServiceConfig } from '../base-service';
import { CreateCourseSkuDTO } from './dtos/create-course-sku.dto';

export interface CourseSkuServiceConfig extends BaseServiceConfig {
  readonly courseId: string;
}

export class CourseSkuServiceRest extends BaseService {
  readonly courseId: string;
  constructor(data: CourseSkuServiceConfig) {
    super(data);
    this.courseId = data.courseId;
  }

  async create(data: CreateCourseSkuDTO): Promise<SkuModel> {
    try {
      const response = await this.client.post<SkuModel>(
        `/courses/${this.courseId}/skus`,
        data
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async delete(skuId: string): Promise<SkuModel> {
    try {
      const response = await this.client.patch<SkuModel>(
        `/skus/${skuId}/cancel`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(data?: { filter?: { active: string } }): Promise<SkuModel[]> {
    try {
      const params = Object.entries(data?.filter || {});
      const queryParams: string = params
        .map(([key, value]) => `${key}=${value || ''}`)
        .join('&');

      const response = await this.client.get<SkuModel[]>(
        `/courses/${this.courseId}/skus${
          params?.length > 0 ? '?' + queryParams : ''
        }`
      );
      if (response?.data.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

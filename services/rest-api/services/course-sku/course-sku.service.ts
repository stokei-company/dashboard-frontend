import { SkuModel } from '~/services/@types/sku';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { convertObjectToParams } from '~/utils/convert-object-to-params';
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

  async create(data: CreateCourseSkuDTO | FormData): Promise<SkuModel> {
    try {
      const response = await this.client.post<SkuModel>(
        `/courses/${this.courseId}/skus`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
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

  async start(skuId: string): Promise<SkuModel> {
    try {
      const response = await this.client.patch<SkuModel>(
        `/skus/${skuId}/start`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async pause(skuId: string): Promise<SkuModel> {
    try {
      const response = await this.client.patch<SkuModel>(
        `/skus/${skuId}/pause`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(data?: {
    name?: string;
    status?: string;
    limit?: number;
    page?: number;
  }): Promise<FindAllPayload<SkuModel>> {
    try {
      const params = convertObjectToParams(data);
      const response = await this.client.get<FindAllPayload<SkuModel>>(
        `/courses/${this.courseId}/skus${
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

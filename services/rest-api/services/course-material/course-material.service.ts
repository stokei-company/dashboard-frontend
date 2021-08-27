import { MaterialModel } from '~/services/@types/material';
import { BaseService, BaseServiceConfig } from '../base-service';
import { CreateCourseMaterialDTO } from './dtos/create-course-material.dto';

export interface CourseMaterialServiceConfig extends BaseServiceConfig {
  readonly courseId: string;
}

export class CourseMaterialServiceRest extends BaseService {
  readonly courseId: string;
  constructor(data: CourseMaterialServiceConfig) {
    super(data);
    this.courseId = data.courseId;
  }

  async create(
    data: CreateCourseMaterialDTO | FormData
  ): Promise<MaterialModel> {
    try {
      const response = await this.client.post<MaterialModel>(
        `/courses/${this.courseId}/materials`,
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

  async delete(materialId: string): Promise<MaterialModel> {
    try {
      const response = await this.client.delete<MaterialModel>(
        `/courses/${this.courseId}/materials/${materialId}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(): Promise<MaterialModel[]> {
    try {
      const response = await this.client.get<MaterialModel[]>(
        `/courses/${this.courseId}/materials`
      );
      if (response?.data && response?.data.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

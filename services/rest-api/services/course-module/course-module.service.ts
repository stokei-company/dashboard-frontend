import { ModuleModel } from '~/services/@types/module';
import { BaseService, BaseServiceConfig } from '../base-service';
import { CreateCourseModuleDTO } from './dtos/create-course-module.dto';

export interface CourseModuleServiceConfig extends BaseServiceConfig {
  readonly courseId: string;
}

export class CourseModuleServiceRest extends BaseService {
  readonly courseId: string;
  constructor(data: CourseModuleServiceConfig) {
    super(data);
    this.courseId = data.courseId;
  }

  async create(data: CreateCourseModuleDTO): Promise<ModuleModel> {
    try {
      const response = await this.client.post<ModuleModel>(
        `/courses/${this.courseId}/modules`,
        data
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async delete(moduleId: string): Promise<ModuleModel> {
    try {
      const response = await this.client.delete<ModuleModel>(
        `/modules/${moduleId}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(): Promise<ModuleModel[]> {
    try {
      const response = await this.client.get<ModuleModel[]>(
        `/courses/${this.courseId}/modules`
      );
      if (response?.data && response?.data.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

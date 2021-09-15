import { CourseModel } from '~/services/@types/course';
import { convertObjectToParams } from '~/utils/convert-object-to-params';
import { BaseService, BaseServiceConfig } from '../../base-service';

export interface MeCourseServiceConfig extends BaseServiceConfig {}

export class MeCourseServiceRest extends BaseService {
  constructor(data: MeCourseServiceConfig) {
    super(data);
  }

  async findAll(data?: {
    limit?: string;
    page?: string;
  }): Promise<CourseModel[]> {
    try {
      const params = convertObjectToParams(data);
      const response = await this.client.get<CourseModel[]>(
        `/me/courses${params?.exists ? '?' + params.params : ''}`
      );
      if (response?.data?.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

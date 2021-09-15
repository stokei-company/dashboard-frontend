import { UserModel } from '~/services/@types/user';
import { FindAllData } from '~/services/interfaces/find-all.data';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { convertObjectToParams } from '~/utils/convert-object-to-params';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface CourseUserServiceConfig extends BaseServiceConfig {
  readonly courseId: string;
}

export class CourseUserServiceRest extends BaseService {
  readonly courseId: string;
  constructor(data: CourseUserServiceConfig) {
    super(data);
    this.courseId = data.courseId;
  }

  async findAll(data?: FindAllData): Promise<FindAllPayload<UserModel>> {
    try {
      const params = convertObjectToParams({
        ...(data || {}),
        ...(data?.filter || {})
      });
      const response = await this.client.get<FindAllPayload<UserModel>>(
        `/courses/${this.courseId}/users${
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

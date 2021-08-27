import { UserModel } from '~/services/@types/user';
import { FindAllData } from '~/services/interfaces/find-all.data';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
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
      const params = Object.entries({ ...data?.filter, ...data }).map(
        ([key, value]) => `${key}=${value || ''}`
      );

      const paramsString = params.join('&');
      const response = await this.client.get<FindAllPayload<UserModel>>(
        `/courses/${this.courseId}/users${
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

import { BaseService, BaseServiceConfig } from '../base-service';
import { FindAllPayloadDTO } from './interfaces/find-all-payload.dto';
import { FindAllDTO } from './interfaces/find-all.dto';

export interface UserServiceConfig extends BaseServiceConfig {}

export class UserServiceRest extends BaseService {
  constructor(data: UserServiceConfig) {
    super(data);
  }

  async findAll(data?: FindAllDTO): Promise<FindAllPayloadDTO> {
    try {
      const dataParams = Object.entries(data);
      let params = '';
      if (dataParams.length > 0) {
        params = dataParams
          .map(([key, value]) => `${key}=${value || ''}`)
          .join('&');
      }
      const response = await this.client.get<FindAllPayloadDTO>(
        `/users${params ? '?' + params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

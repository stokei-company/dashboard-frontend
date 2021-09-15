import { convertObjectToParams } from '~/utils/convert-object-to-params';
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
      const params = convertObjectToParams(data);
      const response = await this.client.get<FindAllPayloadDTO>(
        `/users${params?.exists ? '?' + params.params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

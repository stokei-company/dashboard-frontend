import { AddressModel } from '~/services/@types/address';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface AddressServiceConfig extends BaseServiceConfig {}

export class AddressServiceRest extends BaseService {
  constructor(data: AddressServiceConfig) {
    super(data);
  }

  async create(data: {}): Promise<AddressModel> {
    try {
      const response = await this.client.post<AddressModel>(
        `/me/addresses`,
        data
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

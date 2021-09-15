import { SubscriptionModel } from '~/services/@types/subscription';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { convertObjectToParams } from '~/utils/convert-object-to-params';
import { BaseService, BaseServiceConfig } from '../../base-service';

export interface MeSubscriptionServiceConfig extends BaseServiceConfig {}

export class MeSubscriptionServiceRest extends BaseService {
  constructor(data: MeSubscriptionServiceConfig) {
    super(data);
  }

  async findAll(data?: {
    limit?: string;
    page?: string;
    status?: string;
    type?: string;
    createdAt?: string;
  }): Promise<FindAllPayload<SubscriptionModel>> {
    try {
      const params = convertObjectToParams(data);
      const response = await this.client.get<FindAllPayload<SubscriptionModel>>(
        `/me/subscriptions${params?.exists ? '?' + params.params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

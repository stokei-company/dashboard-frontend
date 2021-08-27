import { SubscriptionModel } from '~/services/@types/subscription';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface SubscriptionServiceConfig extends BaseServiceConfig {}

export class SubscriptionServiceRest extends BaseService {
  constructor(data: SubscriptionServiceConfig) {
    super(data);
  }

  async cancel(id: string): Promise<boolean> {
    try {
      const response = await this.client.patch<{ ok: boolean }>(
        `/subscriptions/${id}/cancel`
      );
      if (response?.data) {
        return true;
      }
    } catch (error) {}
    return false;
  }

  async start(id: string): Promise<boolean> {
    try {
      const response = await this.client.patch<{ ok: boolean }>(
        `/subscriptions/${id}/start`
      );
      if (response?.data) {
        return true;
      }
    } catch (error) {}
    return false;
  }

  async findById(id: string): Promise<SubscriptionModel> {
    try {
      const response = await this.client.get<SubscriptionModel>(
        `/subscriptions/${id}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(data?: {
    status?: string;
    createdAt?: string;
    page?: string;
    limit?: string;
  }): Promise<FindAllPayload<SubscriptionModel>> {
    try {
      const requestData = Object.entries(data || {});
      const params =
        requestData.length > 0
          ? requestData.map(([key, value]) => `${key}=${value || ''}`).join('&')
          : '';
      const response = await this.client.get<FindAllPayload<SubscriptionModel>>(
        `/subscriptions${requestData?.length ? '?' + params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

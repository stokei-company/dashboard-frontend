import { AppModel } from '~/services/@types/app';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { convertObjectToParams } from '~/utils/convert-object-to-params';
import { BaseService, BaseServiceConfig } from '../base-service';
import { CreateAppDTO } from './dtos/create-app.dto';

export interface AppServiceConfig extends BaseServiceConfig {}

export class AppServiceRest extends BaseService {
  constructor(data: AppServiceConfig) {
    super(data);
  }

  async create(data: CreateAppDTO): Promise<AppModel> {
    try {
      const response = await this.client.post<AppModel>(`/apps`, data);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async loadInfos(): Promise<AppModel> {
    try {
      const response = await this.client.get<AppModel>(`/apps/infos`);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async exists(data?: { nickname?: string }): Promise<boolean> {
    try {
      const params = convertObjectToParams(data);
      const response = await this.client.get<{ ok: boolean }>(
        `/apps/exists${params?.exists ? '?' + params.params : ''}`
      );
      return response?.data?.ok;
    } catch (error) {}
    return false;
  }

  async findAll(data?: {
    page?: number;
    limit?: number;
    name?: string;
    nickname?: string;
    country?: string;
    status?: string;
    blockedAt?: string;
    canceledAt?: string;
    updatedAt?: string;
    createdAt?: string;
  }): Promise<FindAllPayload<AppModel>> {
    try {
      const params = convertObjectToParams(data);
      const response = await this.client.get<FindAllPayload<AppModel>>(
        `/apps${params?.exists ? '?' + params.params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

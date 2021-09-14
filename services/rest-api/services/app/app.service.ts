import { AppModel } from '~/services/@types/app';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
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

  async findAll(data?: {
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
      const response = await this.client.get<FindAllPayload<AppModel>>(`/apps`);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

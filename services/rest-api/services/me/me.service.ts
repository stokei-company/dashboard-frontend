import { CourseModel } from '~/services/@types/course';
import { SubscriptionModel } from '~/services/@types/subscription';
import { MeModel } from '~/services/@types/me';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface MeServiceConfig extends BaseServiceConfig {}

export class MeServiceRest extends BaseService {
  constructor(data: MeServiceConfig) {
    super(data);
  }

  async load(): Promise<MeModel> {
    try {
      const response = await this.client.get<MeModel>(`/me`);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async updateAvatar(data?: { image: any }): Promise<any> {
    try {
      if (data?.image) {
        const formData = new FormData();
        formData.append('image', data?.image);
        const response = await this.client.patch(`/me/avatars`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response?.data) {
          return response.data;
        }
      }
    } catch (error) {}
    return null;
  }

  async update(data?: {
    firstname?: string;
    lastname?: string;
    cpf?: string;
    country?: string;
    phone?: string;
    dateBirthday?: string;
  }): Promise<any> {
    try {
      const response = await this.client.patch(`/me`, {
        firstname: data?.firstname,
        lastname: data?.lastname,
        cpf: data?.cpf,
        country: data?.country,
        phone: data?.phone,
        dateBirthday: data?.dateBirthday
      });
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async subscriptions(data?: {
    limit?: string;
    page?: string;
    status?: string;
    type?: string;
    createdAt?: string;
  }): Promise<FindAllPayload<SubscriptionModel>> {
    try {
      const dataParams = Object.entries(data || {});
      let params = '';
      if (dataParams.length > 0) {
        params = dataParams
          .map(([key, value]) => `${key}=${value || ''}`)
          .join('&');
      }
      const response = await this.client.get<FindAllPayload<SubscriptionModel>>(
        `/me/subscriptions${params ? '?' + params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async courses(data?: {
    limit?: string;
    page?: string;
  }): Promise<CourseModel[]> {
    try {
      const dataParams = Object.entries(data || {});
      let params = '';
      if (dataParams.length > 0) {
        params = dataParams
          .map(([key, value]) => `${key}=${value || ''}`)
          .join('&');
      }
      const response = await this.client.get<CourseModel[]>(
        `/me/courses${params ? '?' + params : ''}`
      );
      if (response?.data?.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

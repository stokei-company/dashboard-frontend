import { MeModel } from '~/services/@types/me';
import { BaseService, BaseServiceConfig } from '../base-service';
import {
  MeCourseServiceConfig,
  MeCourseServiceRest
} from './me-course/me-course.service';
import {
  MeSubscriptionServiceConfig,
  MeSubscriptionServiceRest
} from './me-subscription/me-subscription.service';

export interface MeServiceConfig extends BaseServiceConfig {}

export class MeServiceRest extends BaseService {
  constructor(data: MeServiceConfig) {
    super(data);
  }

  subscriptions(config: MeSubscriptionServiceConfig) {
    return new MeSubscriptionServiceRest({ ...this.baseConfig, ...config });
  }
  courses(config: MeCourseServiceConfig) {
    return new MeCourseServiceRest({ ...this.baseConfig, ...config });
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
}

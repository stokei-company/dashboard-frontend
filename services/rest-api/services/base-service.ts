import { getToken } from '~/utils/auth';
import { RestClient } from '../../interfaces/rest-client';
import { axiosClient } from '../clients/axios';

export interface BaseServiceConfig {
  readonly context?: any;
  readonly appId?: string;
  readonly accessToken?: string;
  readonly onUploadProgress?: (progress: number) => any;
}

export class BaseService {
  readonly context?: any;
  readonly appId?: string;
  readonly accessToken?: string;
  readonly client: RestClient;

  constructor(data: BaseServiceConfig) {
    this.context = data.context;
    this.appId = data.appId || this.extractAppId();
    this.accessToken = data.accessToken || getToken(this.context);
    this.client = axiosClient({
      accessToken: this.accessToken,
      appId: this.appId,
      onUploadProgress: data.onUploadProgress
    });
  }

  private extractAppId(): string {
    if (this.context?.params?.appId) {
      return this.context.params.appId + '';
    } else if (this.context?.query?.appId) {
      return this.context.query.appId + '';
    }
    return null;
  }
}

import { VideoModel } from '~/services/@types/video';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface VideoServiceConfig extends BaseServiceConfig {}

export class VideoServiceRest extends BaseService {
  constructor(data: VideoServiceConfig) {
    super(data);
  }

  async findById(id: string): Promise<VideoModel> {
    try {
      if (id) {
        const response = await this.client.get<VideoModel>(`/videos/${id}`);
        if (response?.data) {
          return response.data;
        }
      }
    } catch (error) {}
    return null;
  }
}

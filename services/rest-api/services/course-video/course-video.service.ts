import { VideoModel } from '~/services/@types/video';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { BaseService, BaseServiceConfig } from '../base-service';
import { CreateCourseVideoDTO } from './dtos/create-course-video.dto';
import { UpdateCourseVideoDTO } from './dtos/update-course-video.dto';

export interface CourseVideoServiceConfig extends BaseServiceConfig {
  readonly moduleId: string;
}

export class CourseVideoServiceRest extends BaseService {
  readonly moduleId: string;
  constructor(data: CourseVideoServiceConfig) {
    super(data);
    this.moduleId = data.moduleId;
  }

  async create(data: CreateCourseVideoDTO | FormData): Promise<VideoModel> {
    try {
      const response = await this.client.post<VideoModel>(
        `/modules/${this.moduleId}/videos`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async update(
    videoId: string,
    data: UpdateCourseVideoDTO | FormData
  ): Promise<VideoModel> {
    try {
      const response = await this.client.patch<VideoModel>(
        `/videos/${videoId}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async delete(videoId: string): Promise<VideoModel> {
    try {
      const response = await this.client.delete<VideoModel>(
        `/videos/${videoId}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(data?: {
    page?: string;
    limit?: string;
    title?: string;
    description?: string;
    position?: string;
    status?: string;
    updatedAt?: string;
    createdAt?: string;
  }): Promise<FindAllPayload<VideoModel>> {
    try {
      const requestData = Object.entries(data || {});
      const params =
        requestData.length > 0
          ? requestData.map(([key, value]) => `${key}=${value || ''}`).join('&')
          : '';
      const response = await this.client.get<FindAllPayload<VideoModel>>(
        `/modules/${this.moduleId}/videos${
          requestData?.length ? '?' + params : ''
        }`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

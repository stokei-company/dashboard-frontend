import { CategoryModel } from '~/services/@types/category';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface CategoryServiceConfig extends BaseServiceConfig {}

export class CategoryServiceRest extends BaseService {
  constructor(data: CategoryServiceConfig) {
    super(data);
  }

  async findById(id: string): Promise<CategoryModel> {
    try {
      const response = await this.client.get<CategoryModel>(
        `/categories/${id}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(): Promise<CategoryModel[]> {
    try {
      const response = await this.client.get<CategoryModel[]>(`/categories`);
      if (response?.data && response?.data.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

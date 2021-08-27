import { PriceModel } from '~/services/@types/price';
import { BaseService, BaseServiceConfig } from '../base-service';
import { AddDiscountDTO } from './dtos/add-discount.dto';

export interface PriceServiceConfig extends BaseServiceConfig {}

export class PriceServiceRest extends BaseService {
  constructor(data: PriceServiceConfig) {
    super(data);
  }

  async addDiscount(
    priceId: string,
    data: AddDiscountDTO
  ): Promise<PriceModel> {
    try {
      const response = await this.client.post<PriceModel>(
        `/prices/${priceId}/discount`,
        data
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async deleteDiscount(priceId: string): Promise<boolean> {
    try {
      const response = await this.client.delete<{ ok: boolean }>(
        `/prices/${priceId}/discount`
      );
      if (response?.data?.ok) {
        return true;
      }
    } catch (error) {}
    return false;
  }

  async findAll(): Promise<PriceModel[]> {
    try {
      const response = await this.client.get<PriceModel[]>(`/prices`);
      if (response?.data && response?.data.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

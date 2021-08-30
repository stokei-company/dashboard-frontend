import { PriceModel } from '~/services/@types/price';
import { SkuModel } from '~/services/@types/sku';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { BaseService, BaseServiceConfig } from '../base-service';
import { AddQuantitySkuDTO } from './dtos/add-quantity-sku.dto';
import { WithdrawQuantitySkuDTO } from './dtos/withdraw-quantity-sku.dto';

export interface SkuServiceConfig extends BaseServiceConfig {}

export class SkuServiceRest extends BaseService {
  constructor(data: SkuServiceConfig) {
    super(data);
  }

  async addQuantity(skuId: string, data: AddQuantitySkuDTO): Promise<boolean> {
    try {
      const response = await this.client.patch<{ ok: boolean }>(
        `/skus/${skuId}/quantity/add`,
        data
      );
      if (response?.data?.ok) {
        return true;
      }
    } catch (error) {}
    return false;
  }

  async withdrawQuantity(
    skuId: string,
    data: WithdrawQuantitySkuDTO
  ): Promise<boolean> {
    try {
      const response = await this.client.patch<{ ok: boolean }>(
        `/skus/${skuId}/quantity/withdraw`,
        data
      );
      if (response?.data?.ok) {
        return true;
      }
    } catch (error) {}
    return false;
  }

  async findById(id: string): Promise<SkuModel> {
    try {
      const response = await this.client.get<SkuModel>(`/skus/${id}`);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAll(data?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<FindAllPayload<SkuModel>> {
    try {
      const response = await this.client.get<FindAllPayload<SkuModel>>(`/skus`);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async findAllPrices(skuId): Promise<PriceModel[]> {
    try {
      const response = await this.client.get<PriceModel[]>(
        `/skus/${skuId}/prices`
      );
      if (response?.data && response?.data.length > 0) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}

import { DiscountModel } from './discount';

export interface PriceModel {
  readonly id: string;
  readonly parent: string;
  readonly parentType: string;
  readonly discount?: DiscountModel;
  readonly fromAmount?: number;
  readonly amount: number;
  readonly currency: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt: string;
}

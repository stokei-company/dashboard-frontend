export interface DiscountModel {
  readonly id: string;
  readonly appId?: string;
  readonly currency?: string;
  readonly name: string;
  readonly status: string;
  readonly description?: string;
  readonly percentageOff?: number;
  readonly amountOff?: number;
  readonly maxAmountOff?: number;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly canceledAt?: string;
  readonly updatedAt: string;
  readonly createdAt: string;
}

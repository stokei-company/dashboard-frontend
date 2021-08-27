interface DiscountDTO {
  readonly currency?: string;
  readonly name: string;
  readonly description?: string;
  readonly percentageOff?: number;
  readonly amountOff?: number;
  readonly maxAmountOff?: number;
  readonly startAt?: string;
  readonly endAt?: string;
}

export interface AddDiscountDTO {
  readonly discountId?: string;
  readonly discount?: DiscountDTO;
}

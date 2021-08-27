export interface InventoryDTO {
  readonly type?: string;
  readonly quantity?: number;
}

export interface PriceDTO {
  readonly amount: number;
}

export interface RecurringDTO {
  readonly type?: string;
  readonly interval: number;
}

export interface CreateCourseSkuDTO {
  readonly name: string;
  readonly code?: string;
  readonly type: string;
  readonly prices: PriceDTO[];
  readonly keywords?: string[];
  readonly recurring: RecurringDTO;
  readonly inventory?: InventoryDTO;
}

export interface Inventory{
    readonly id: string;
    readonly type?: string;
    readonly available: boolean;
    readonly quantity?: number;
    readonly canceledAt?: string;
    readonly updatedAt?: string;
    readonly createdAt: string;
}

export interface Recurring{
    readonly type: string;
    readonly interval: number;
}

export interface SkuModel{
    readonly id: string;
    readonly name: string;
    readonly code?: string;
    readonly keywords?: string[];
    readonly currency: string;
    readonly attributes?: object;
    readonly active: boolean;
    readonly inventory?: Inventory;
    readonly canceledAt?: string;
    readonly updatedAt?: string;
    readonly createdAt: string;
    readonly recurring?: Recurring;
}
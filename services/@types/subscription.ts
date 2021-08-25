import { AppModel } from "./app";
import { UserModel } from "./user";

export interface SubscriptionModel {
    readonly recurring?: {
        readonly type: string;
        readonly interval: number;
    };
    readonly object: string;
    readonly id: string;
    readonly app?: AppModel;
    readonly user?: UserModel;
    readonly reference?: string;
    readonly referenceType?: string;
    readonly orderId?: string;
    readonly appId?: string;
    readonly product?: object;
    readonly price?: object;
    readonly quantity?: number;
    readonly startAt?: string;
    readonly endAt?: string;
    readonly status?: string;
    readonly type?: string;
    readonly availableAt?: string;
    readonly canceledAt?: string;
    readonly updatedAt?: string;
    readonly createdAt: string;
}
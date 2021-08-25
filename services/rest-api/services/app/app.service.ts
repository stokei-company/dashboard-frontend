import { AppModel } from "~/services/@types/app";
import { BaseService, BaseServiceConfig } from "../base-service";

export interface AppServiceConfig extends BaseServiceConfig { }

export class AppServiceRest extends BaseService {
    constructor(data: AppServiceConfig) {
        super(data);
    }

    async loadInfos(): Promise<AppModel> {
        try {
            const response = await this.client.get<AppModel>(`/apps/infos`);
            if (response?.data) {
                return response.data;
            }
        } catch (error) { }
        return null;
    }

    async findAll(): Promise<AppModel[]> {
        try {
            const response = await this.client.get<AppModel[]>(`/apps`);
            if (response?.data && response?.data.length > 0) {
                return response.data;
            }
        } catch (error) {}
        return null;
    }
}
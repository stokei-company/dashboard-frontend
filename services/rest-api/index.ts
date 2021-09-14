import { AddressServiceRest } from './services/address/address.service';
import { AppServiceRest } from './services/app/app.service';
import { BaseServiceConfig } from './services/base-service';
import { CategoryServiceRest } from './services/category/category.service';
import { CourseServiceRest } from './services/course/course.service';
import { MeServiceRest } from './services/me/me.service';
import { PriceServiceRest } from './services/price/price.service';
import { SkuServiceRest } from './services/sku/sku.service';
import { SubscriptionServiceRest } from './services/subscription/subscription.service';
import { UserServiceRest } from './services/user/user.service';
import { VideoServiceRest } from './services/video/video.service';

export interface ClientRestAPIInstance {
  readonly addresses: () => AddressServiceRest;
  readonly apps: () => AppServiceRest;
  readonly categories: () => CategoryServiceRest;
  readonly courses: () => CourseServiceRest;
  readonly me: () => MeServiceRest;
  readonly prices: () => PriceServiceRest;
  readonly skus: () => SkuServiceRest;
  readonly subscriptions: () => SubscriptionServiceRest;
  readonly users: () => UserServiceRest;
  readonly videos: () => VideoServiceRest;
}

export const clientRestApi = <T = BaseServiceConfig>(
  config?: T
): ClientRestAPIInstance => {
  const configData = config || {};
  return {
    addresses: () => new AddressServiceRest(configData),
    apps: () => new AppServiceRest(configData),
    categories: () => new CategoryServiceRest(configData),
    courses: () => new CourseServiceRest(configData),
    me: () => new MeServiceRest(configData),
    prices: () => new PriceServiceRest(configData),
    skus: () => new SkuServiceRest(configData),
    subscriptions: () => new SubscriptionServiceRest(configData),
    users: () => new UserServiceRest(configData),
    videos: () => new VideoServiceRest(configData)
  };
};

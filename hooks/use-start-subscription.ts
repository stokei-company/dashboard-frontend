import { SubscriptionServiceRest } from '~/services/rest-api/services/subscription/subscription.service';
import { useRequest } from './use-request';

export interface UseAppResponse {
  readonly loading: boolean;
  readonly error: any;
  readonly data: { ok: boolean };
  readonly submit: () => void;
}

interface Props {
  readonly appId?: string;
  readonly subscriptionId: string;
}

export const useStartSubscription = ({
  subscriptionId,
  appId
}: Props): UseAppResponse => {
  const subscriptionService = new SubscriptionServiceRest({ appId });
  const { data, error, loading, submit } = useRequest({
    submit: () => subscriptionService.start(subscriptionId)
  });

  return {
    data,
    error,
    loading,
    submit
  };
};

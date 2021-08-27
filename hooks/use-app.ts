import { useEffect } from 'react';
import { AppModel } from '~/services/@types/app';
import { AppServiceRest } from '~/services/rest-api/services/app/app.service';
import { useRequest } from './use-request';

export interface UseAppResponse {
  readonly loading: boolean;
  readonly app: AppModel;
}

export const useApp = ({ appId }): UseAppResponse => {
  const appService = new AppServiceRest({ appId });

  const { data, loading, submit } = useRequest({
    submit: () => appService.loadInfos()
  });

  useEffect(() => {
    (async () => {
      try {
        if (appId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [appId]);

  return {
    app: data,
    loading
  };
};

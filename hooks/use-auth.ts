import { useEffect } from 'react';
import { UserModel } from '~/services/@types/user';
import { MeServiceRest } from '~/services/rest-api/services/me/me.service';
import { useRequest } from './use-request';

export interface UseAuthResponse {
  readonly user: UserModel;
  readonly loading: boolean;
}

export const useAuth = (): UseAuthResponse => {
  const meService = new MeServiceRest({});

  const { data, loading, submit } = useRequest({
    submit: () => meService.load()
  });

  useEffect(() => {
    (async () => {
      try {
        await submit();
      } catch (error) {}
    })();
  }, []);

  return {
    user: data,
    loading
  };
};

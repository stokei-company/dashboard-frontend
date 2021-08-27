import { useEffect } from 'react';
import { PriceModel } from '~/services/@types/price';
import { SkuServiceRest } from '~/services/rest-api/services/sku/sku.service';
import { useRequest } from './use-request';

export interface UseSkuPricesResponse {
  readonly loading: boolean;
  readonly prices: PriceModel[];
}

interface Props {
  readonly appId?: string;
  readonly skuId: string;
}

export const useSkuPrices = ({ appId, skuId }: Props): UseSkuPricesResponse => {
  const skuService = new SkuServiceRest({ appId });

  const { data, loading, submit } = useRequest({
    submit: () => skuService.findAllPrices(skuId)
  });

  useEffect(() => {
    (async () => {
      try {
        if (skuId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [skuId]);

  return {
    prices: data,
    loading
  };
};

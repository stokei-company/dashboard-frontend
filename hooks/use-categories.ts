import { useEffect } from 'react';
import { CategoryModel } from '~/services/@types/category';
import { CategoryServiceRest } from '~/services/rest-api/services/category/category.service';
import { useRequest } from './use-request';

export interface UseCategoriesResponse {
  readonly loading: boolean;
  readonly categories: CategoryModel[];
}

export const useCategories = (): UseCategoriesResponse => {
  const categoryService = new CategoryServiceRest({});

  const { data, loading, submit } = useRequest({
    submit: () => categoryService.findAll()
  });

  useEffect(() => {
    (async () => {
      try {
        await submit();
      } catch (error) {}
    })();
  }, []);

  return {
    categories: data,
    loading
  };
};

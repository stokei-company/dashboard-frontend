export interface FindAllData<TFilter = any> {
  filter: TFilter;
  limit?: number;
  page?: number;
}

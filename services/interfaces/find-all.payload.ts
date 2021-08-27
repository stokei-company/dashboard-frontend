export interface FindAllPayload<TItems = any> {
  items: TItems[];
  totalItems: number;
  totalPages: number;
  page: number;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  prevPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

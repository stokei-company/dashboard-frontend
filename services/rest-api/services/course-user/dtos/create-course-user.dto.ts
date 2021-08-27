export interface RecurringDTO {
  readonly type?: string;
  readonly interval: number;
}

export interface CreateCourseUserDTO {
  readonly userId: string;
  readonly recurring: RecurringDTO;
}

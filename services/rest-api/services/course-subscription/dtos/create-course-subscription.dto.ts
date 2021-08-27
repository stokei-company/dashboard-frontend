export interface RecurringDTO {
  readonly type?: string;
  readonly interval: number;
}

export interface CreateCourseSubscriptionDTO {
  readonly userId: string;
  readonly type: string;
  readonly recurring: RecurringDTO;
}

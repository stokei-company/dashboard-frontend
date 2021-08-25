import { AppModel } from './app';
import { UserModel } from './user';

export interface CourseModel {
  readonly id: string;
  readonly app?: AppModel;
  readonly teachers: UserModel[];
  readonly imageUrl?: string;
  readonly name: string;
  readonly description?: string;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly status?: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt: string;
}

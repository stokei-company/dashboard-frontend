export interface UserModel {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly fullname: string;
  readonly username: string;
  readonly avatar?: string;
  readonly email: string;
  readonly roles: string[];
  readonly country?: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt: string;
}

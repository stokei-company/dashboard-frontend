export interface MeModel {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly fullname: string;
  readonly avatar?: string;
  readonly email: string;
  readonly roles: string[];
  readonly cpf?: string;
  readonly country?: string;
  readonly phone?: string;
  readonly dateBirthday?: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt: string;
}

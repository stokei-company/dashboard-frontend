export interface DocumentDTO {
  readonly value: string;
  readonly type: string;
}

export interface PhoneDTO {
  readonly areaCode: string;
  readonly countryAreaCode: string;
  readonly number: string;
}

export interface BankAccountDTO {
  readonly holderName: string;
  readonly holderDocument: string;
  readonly bankCode: string;
  readonly branchNumber: string;
  readonly branchCheckDigit: string;
  readonly accountNumber: string;
  readonly accountCheckDigit: string;
  readonly accountType:
    | 'conta_corrente'
    | 'conta_poupanca'
    | 'conta_corrente_conjunta'
    | 'conta_poupanca_conjunta';
}

export interface CreateAppDTO {
  readonly name: string;
  readonly nickname: string;
  readonly email: string;
  readonly country: string;
  readonly document: DocumentDTO;
  readonly phone: PhoneDTO;
  readonly bankAccount: BankAccountDTO;
}

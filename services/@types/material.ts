export interface MaterialModel {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly description?: string;
  readonly filename: string;
  readonly format: string;
  readonly volume?: number;
  readonly createdAt: string;
}

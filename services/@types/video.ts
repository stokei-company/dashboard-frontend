export interface VideoModel {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly description?: string;
  readonly thumbnail: string;
  readonly watermark: string;
  readonly status?: string;
  readonly volume?: number;
  readonly duration?: number;
  readonly sizes?: string[];
  readonly externalVideo: boolean;
  readonly updatedAt?: string;
  readonly createdAt: string;
}

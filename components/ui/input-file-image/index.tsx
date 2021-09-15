import ImgCrop from 'antd-img-crop';
import React from 'react';
import { Image } from '../image';
import { InputFile, InputFileProps } from '../input-file';

export interface InputFileImageProps extends InputFileProps {
  readonly aspectRatio?: number;
  readonly rounded?: boolean;
  readonly hidePreview?: boolean;
}

export const InputFileImage: React.FC<InputFileImageProps> = ({
  aspectRatio,
  rounded = false,
  hidePreview = false,
  previewElement,
  ...props
}) => {
  return (
    <ImgCrop
      rotate
      aspect={aspectRatio}
      shape={rounded ? 'round' : 'rect'}
      modalOk="Ok"
      modalCancel="Cancelar"
      modalTitle="Editar imagem"
      fillColor="transparent"
      quality={100}
    >
      <InputFile
        accept="image/png, image/jpg, image/jpeg"
        hidePreview={hidePreview}
        previewElement={(fileUrl: string) =>
          previewElement ? (
            previewElement(fileUrl)
          ) : (
            <Image
              width="full"
              src={fileUrl}
              fallbackSrc="/no-image.png"
              alt="previewImage"
            />
          )
        }
        {...props}
      />
    </ImgCrop>
  );
};

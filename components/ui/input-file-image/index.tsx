import ImgCrop from 'antd-img-crop';
import React from 'react';
import { Image } from '../image';
import { InputFile, InputFileProps } from '../input-file';

interface Props extends InputFileProps {
  readonly aspectRatio?: number;
  readonly rounded?: boolean;
}

export const InputFileImage: React.FC<Props> = ({
  aspectRatio,
  rounded = false,
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

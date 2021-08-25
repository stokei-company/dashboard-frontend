import ImgCrop from "antd-img-crop";
import React from "react";
import { Image } from "../image";
import { InputFile, InputFileProps } from "../input-file";

interface Props extends InputFileProps {
  readonly aspectRatio?: number;
}

export const InputFileImage: React.FC<Props> = ({ aspectRatio, ...props }) => {
  return (
    <ImgCrop
      rotate
      aspect={aspectRatio}
      modalOk="Ok"
      modalCancel="Cancelar"
      modalTitle="Editar imagem"
      fillColor="transparent"
      quality={100}
    >
      <InputFile
        accept="image/png, image/jpg, image/jpeg"
        previewElement={(fileUrl: string) => (
          <Image
            width="full"
            src={fileUrl}
            fallbackSrc="/no-image.png"
            alt="previewImage"
          />
        )}
        {...props}
      />
    </ImgCrop>
  );
};

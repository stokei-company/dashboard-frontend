import {
  Flex,
  SimpleGrid,
  Icon,
  Text,
  FormLabel,
  useDisclosure
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { CloseIcon } from '~/components/icons';
import { Image } from '../image';
import { InputFileImage, InputFileImageProps } from '../input-file-image';

interface ImageBoxProps {
  readonly fileUrl: string;
  readonly onRemove: () => void;
}
export const ImageBox: React.FC<ImageBoxProps> = ({
  fileUrl,
  onRemove,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex width="full" position="relative">
      {isOpen && (
        <Flex
          width="full"
          height="full"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          onClick={() => onRemove()}
          onMouseLeave={onClose}
          backgroundColor="rgba(0,0,0,.7)"
          flexDir="column"
          cursor="pointer"
        >
          <Icon as={CloseIcon} color="white" fontSize="xl" />
          <Text color="white" fontWeight="bold">
            Remover
          </Text>
        </Flex>
      )}

      <Image width="full" src={fileUrl} alt="img" onMouseOver={onOpen} />
    </Flex>
  );
};

interface InputFileImagesProps extends Omit<InputFileImageProps, 'onChange'> {
  readonly onChange: (images: any[]) => void;
}

export const InputFileImages: React.FC<InputFileImagesProps> = ({
  onChange,
  label,
  ...props
}) => {
  const [images, setImages] = useState<any[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const handleAddImage = useCallback(
    (image) => {
      if (image) {
        const previewImg = URL.createObjectURL(image);
        const imagesObjs = [...images, image];
        setImages((imgs) => [...imgs, image]);
        setImagesPreview((imgs) => [...imgs, previewImg]);
        if (onChange) {
          onChange(imagesObjs);
        }
      }
    },
    [images]
  );

  const handleRemoveImage = useCallback(
    (index) => {
      const imagesObjs = images.filter((_, i) => i !== index);
      setImages(imagesObjs);
      setImagesPreview((imgs) => imgs.filter((_, i) => i !== index));
      if (onChange) {
        onChange(imagesObjs);
      }
    },
    [images]
  );

  return (
    <Flex width="full" flexDir="column" paddingBottom={5} overflowX="auto">
      {label && <FormLabel>{label}</FormLabel>}
      <SimpleGrid columns={3} spacing={5}>
        <Flex width="full">
          <InputFileImage
            {...props}
            onChange={(e) =>
              handleAddImage(
                e.target.files?.length > 0 ? e.target.files[0] : null
              )
            }
          />
        </Flex>
        {imagesPreview?.length > 0 &&
          imagesPreview.map((imgUrl, index) =>
            props?.previewElement ? (
              props?.previewElement(imgUrl)
            ) : (
              <ImageBox
                fileUrl={imgUrl}
                onRemove={() => handleRemoveImage(index)}
              />
            )
          )}
      </SimpleGrid>
    </Flex>
  );
};

import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Image } from '../../image';

export interface CardImg {
  readonly image: string;
  readonly fallbackSrc: string;
}

export const CardImg: React.FC<CardImg> = ({
  image = null,
  fallbackSrc = '',
  children
}) => {
  return (
    <Flex overflow="hidden" borderTopRadius="sm">
      <Image width="full" src={image} fallbackSrc={fallbackSrc} alt="image" />
    </Flex>
  );
};

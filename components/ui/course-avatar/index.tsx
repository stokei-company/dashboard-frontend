import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '~/styles/colors';

export const CourseAvatar: React.FC<ChakraAvatarProps> = (props) => {
  return (
    <ChakraAvatar
      borderRadius="sm"
      size="sm"
      color={!props.src ? 'white' : 'black'}
      loading="lazy"
      backgroundColor={!props.src ? colors.primary.main : 'gray.100'}
      {...props}
    />
  );
};

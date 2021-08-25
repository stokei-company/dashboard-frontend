import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '~/styles/colors';

export const UserAvatar: React.FC<ChakraAvatarProps> = (props) => {
  return (
    <ChakraAvatar
      size="sm"
      color={!props.src ? 'white' : 'black'}
      backgroundColor={!props.src ? colors.primary.main : 'gray.100'}
      loading="lazy"
      {...props}
    />
  );
};

import React from 'react';
import {
  Link as ChakraLink,
  Grid,
  LinkProps,
  Stack,
  Icon,
  Flex
} from '@chakra-ui/react';
import { BackIcon } from '~/components/icons';
import NextLink from 'next/link';
import { colors } from '~/styles/colors';

export interface BackLinkProps extends LinkProps {}

export const BackLink: React.FC<BackLinkProps> = ({
  children,
  href = '',
  ...props
}) => {
  return (
    <NextLink href={href}>
      <ChakraLink color={colors.primary.main} {...props}>
        <Stack
          fontSize="sm"
          direction="row"
          spacing={3}
          alignItems="flex-start"
        >
          <Icon as={BackIcon} />
          <Flex lineHeight="shorter">{children}</Flex>
        </Stack>
      </ChakraLink>
    </NextLink>
  );
};

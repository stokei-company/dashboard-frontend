import {
  Box,
  Flex,
  Link as DefaultLink,
  LinkProps,
  Stack,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { colors } from '~/styles/colors';

interface Props extends LinkProps {
  readonly href?: string;
  readonly isExternal?: boolean;
  readonly icon?: ReactNode;
}

const Body: React.FC<Props> = ({ icon, children }) => {
  return (
    <Stack direction="row" spacing="5" align="center">
      {icon && <Flex fontSize="lg">{icon}</Flex>}
      {typeof children === 'string' ? (
        <Text lineHeight="shorter" fontSize="md">
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  );
};

export const Link: React.FC<Props> = ({
  children,
  href = '',
  icon,
  isExternal,
  ...props
}) => {
  const { asPath } = useRouter();
  const style: LinkProps = {
    paddingY: '3',
    paddingX: '5',
    borderRightWidth: 'thick',
    borderColor: 'transparent',
    color: 'gray.500'
  };
  const styleHolver: LinkProps = {
    color: colors.primary.main,
    borderColor: colors.primary.main,
    backgroundColor: 'green.50'
  };
  const styleActive = asPath === href || asPath === props.as ? styleHolver : {};
  if (isExternal === true) {
    return (
      <DefaultLink
        {...style}
        _hover={styleHolver}
        href={href}
        isExternal={isExternal}
        {...styleActive}
        {...props}
      >
        <Body icon={icon}>{children}</Body>
      </DefaultLink>
    );
  }
  return (
    <NextLink href={href}>
      <DefaultLink {...style} _hover={styleHolver} {...styleActive} {...props}>
        <Body icon={icon}>{children}</Body>
      </DefaultLink>
    </NextLink>
  );
};

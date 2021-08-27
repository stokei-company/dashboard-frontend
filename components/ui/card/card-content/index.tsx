import { Flex, Stack } from '@chakra-ui/react';
import React, { useMemo } from 'react';

export interface CardContentProps {
  readonly padding?: number | string;
  readonly paddingX?: number | string;
  readonly paddingY?: number | string;
  readonly paddingTop?: number | string;
  readonly paddingBottom?: number | string;
  readonly paddingLeft?: number | string;
  readonly paddingRight?: number | string;
}

export const CardContent: React.FC<CardContentProps> = ({
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  children
}) => {
  const stylePadding = useMemo(() => {
    return {
      padding: padding ?? 5,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight
    };
  }, [
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight
  ]);
  return (
    <Stack direction="column" spacing={3} width="full" {...stylePadding}>
      {children}
    </Stack>
  );
};

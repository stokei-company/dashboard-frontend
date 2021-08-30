import { Flex, FlexProps } from '@chakra-ui/react';
import React, { ReactNode, useMemo } from 'react';
import { CardBody } from './card-body';
import { CardContent } from './card-content';
import { CardFooter } from './card-footer';
import { CardHeader } from './card-header';
import { CardImg } from './card-img';
import { CardMenu, CardMenuItemData } from './card-menu';

interface Props extends FlexProps {
  readonly title?: any;
  readonly subtitle?: string | ReactNode;
  readonly menu?: CardMenuItemData[];
  readonly headerImage?: string;
  readonly headerFallbackImage?: string;
  readonly avatar?: string | ReactNode;
  readonly avatarName?: string;
  readonly body?: ReactNode;
  readonly footer?: ReactNode;
  readonly padding?: number | string;
  readonly paddingX?: number | string;
  readonly paddingY?: number | string;
  readonly paddingTop?: number | string;
  readonly paddingBottom?: number | string;
  readonly paddingLeft?: number | string;
  readonly paddingRight?: number | string;
}

export const Card: React.FC<Props> = ({
  title,
  subtitle,
  menu,
  body,
  footer,
  avatar,
  avatarName,
  headerImage,
  headerFallbackImage,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  ...props
}) => {
  const listMenu = useMemo(() => {
    if (!menu?.length) {
      return [];
    }
    return menu.filter(Boolean);
  }, [menu]);

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
      borderRadius="sm"
      boxShadow="sm"
      position="relative"
      {...props}
    >
      {headerImage && (
        <CardImg image={headerImage} fallbackSrc={headerFallbackImage} />
      )}
      {listMenu?.length > 0 && <CardMenu items={listMenu} />}
      <CardContent
        padding={padding}
        paddingX={paddingX}
        paddingY={paddingY}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
      >
        {(avatar || avatarName || title || subtitle) && (
          <CardHeader
            avatar={avatar}
            avatarName={avatarName}
            title={title}
            subtitle={subtitle}
          />
        )}
        {body && <CardBody>{body}</CardBody>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </CardContent>
    </Flex>
  );
};

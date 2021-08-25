import { Icon } from '@chakra-ui/react';
import React from 'react';
import { AppIcon, CourseIcon, SubscriptionIcon } from '~/components/icons';
import {
  Layout as LayoutDefault,
  LayoutProps
} from '~/components/layouts/layout';

interface RootLayoutProps extends LayoutProps {}

export const Layout: React.FC<RootLayoutProps> = ({
  children,
  menuOptions,
  ...props
}) => {
  return (
    <LayoutDefault
      {...props}
      menuOptions={[
        {
          title: 'Aplicações',
          href: '/',
          icon: <Icon as={AppIcon} />
        },
        {
          title: 'Assinaturas',
          icon: <Icon as={SubscriptionIcon} />,
          subitems: [
            {
              title: 'Todas',
              href: '/subscriptions'
            },
            {
              title: 'Ativas',
              href: '/subscriptions?status=available'
            },
            {
              title: 'Canceladas',
              href: '/subscriptions?status=canceled'
            },
            {
              title: 'Finalizadas',
              href: '/subscriptions?status=finished'
            },
            {
              title: 'Pendentes',
              href: '/subscriptions?status=pending'
            }
          ]
        },
        {
          title: 'Meus cursos',
          href: '/courses',
          icon: <Icon as={CourseIcon} />
        }
      ]}
    >
      <main>{children}</main>
    </LayoutDefault>
  );
};

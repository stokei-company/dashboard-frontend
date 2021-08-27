import { Icon } from '@chakra-ui/react';
import React from 'react';
import {
  AboutIcon,
  CourseIcon,
  DashboardIcon,
  OrderIcon,
  SettingIcon
} from '~/components/icons';
import {
  Layout as LayoutDefault,
  LayoutProps
} from '~/components/layouts/layout';
import AppContextProvider, { AppContext } from '~/contexts/app';

interface Props extends LayoutProps {}

export const Layout: React.FC<Props> = ({
  children,
  menuOptions,
  ...props
}) => {
  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {({ baseUrl }) => (
          <LayoutDefault
            {...props}
            menuOptions={[
              {
                href: baseUrl,
                title: 'Painel',
                icon: <Icon as={DashboardIcon} />
              },
              {
                href: baseUrl + '/about',
                title: 'Sobre',
                icon: <Icon as={AboutIcon} />
              },
              {
                href: baseUrl + '/courses',
                title: 'Cursos',
                icon: <Icon as={CourseIcon} />
              },
              {
                href: baseUrl + '/orders',
                title: 'Pedidos',
                icon: <Icon as={OrderIcon} />
              },
              {
                href: baseUrl + '/settings',
                title: 'Configurações',
                icon: <Icon as={SettingIcon} />
              }
            ]}
          >
            <main>{children}</main>
          </LayoutDefault>
        )}
      </AppContext.Consumer>
    </AppContextProvider>
  );
};

import { Icon } from '@chakra-ui/react';
import React from 'react';
import {
  AboutIcon,
  DashboardIcon,
  MaterialIcon,
  PlanIcon,
  SettingIcon,
  SubscriptionIcon,
  UserIcon,
  VideoIcon
} from '~/components/icons';
import {
  Layout as LayoutDefault,
  LayoutProps
} from '~/components/layouts/layout';
import { CourseContext, CourseContextProvider } from '~/contexts/course';

interface Props extends LayoutProps {}

export const Layout: React.FC<Props> = ({
  children,
  menuOptions,
  ...props
}) => {
  return (
    <CourseContextProvider>
      <CourseContext.Consumer>
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
                icon: <Icon as={AboutIcon} />,
                title: 'Sobre'
              },
              {
                title: 'Assinaturas',
                icon: <Icon as={SubscriptionIcon} />,
                subitems: [
                  {
                    title: 'Todas',
                    href: baseUrl + '/subscriptions'
                  },
                  {
                    title: 'Ativas',
                    href: baseUrl + '/subscriptions?status=available'
                  },
                  {
                    title: 'Canceladas',
                    href: baseUrl + '/subscriptions?status=canceled'
                  },
                  {
                    title: 'Finalizadas',
                    href: baseUrl + '/subscriptions?status=finished'
                  },
                  {
                    title: 'Pendentes',
                    href: baseUrl + '/subscriptions?status=pending'
                  }
                ]
              },
              {
                href: baseUrl + '/users',
                icon: <Icon as={UserIcon} />,
                title: 'Alunos'
              },
              {
                href: baseUrl + '/materials',
                icon: <Icon as={MaterialIcon} />,
                title: 'Materiais'
              },
              {
                href: baseUrl + '/modules',
                icon: <Icon as={VideoIcon} />,
                title: 'Videos'
              },
              {
                icon: <Icon as={PlanIcon} />,
                title: 'Planos',
                subitems: [
                  {
                    title: 'Todos',
                    href: baseUrl + '/plans'
                  },
                  {
                    title: 'Ativos',
                    href: baseUrl + '/plans?status=available'
                  },
                  {
                    title: 'Cancelados',
                    href: baseUrl + '/plans?status=canceled'
                  },
                  {
                    title: 'Pausados',
                    href: baseUrl + '/plans?status=paused'
                  }
                ]
              },
              {
                href: baseUrl + '/settings',
                icon: <Icon as={SettingIcon} />,
                title: 'Configurações'
              }
            ]}
          >
            <main>{children}</main>
          </LayoutDefault>
        )}
      </CourseContext.Consumer>
    </CourseContextProvider>
  );
};

import { Icon } from '@chakra-ui/react';
import { AboutIcon, MaterialIcon, VideoIcon } from '~/components/icons';
import { Layout as BoxLayout } from '~/components/layouts/layout';
import CourseContextProvider, { CourseContext } from '~/contexts/course';

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <CourseContextProvider>
      <CourseContext.Consumer>
        {({ baseUrl }) => (
          <BoxLayout
            menuOptions={[
              {
                href: baseUrl,
                title: 'Sobre',
                icon: <Icon as={AboutIcon} />
              },
              {
                href: baseUrl + '/modules',
                title: 'Videos',
                icon: <Icon as={VideoIcon} />
              },
              {
                href: baseUrl + '/materials',
                title: 'Materiais',
                icon: <Icon as={MaterialIcon} />
              }
            ]}
          >
            {children}
          </BoxLayout>
        )}
      </CourseContext.Consumer>
    </CourseContextProvider>
  );
};

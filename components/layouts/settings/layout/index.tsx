import { Flex, Heading, Text } from '@chakra-ui/react';
import { Layout as RootLayout } from '~/components/layouts/root/layout';
import { Menu } from '~/components/pages/settings/menu';
import { MeModel } from '~/services/@types/me';
import { Container } from '../../container';

export interface LayoutProps {
  readonly user: MeModel;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, ...props }) => {
  return (
    <RootLayout>
      <Container flexDir="column" paddingY={8}>
        <Flex width="full" flexDirection="column">
          <Heading lineHeight="shorter" marginBottom={2}>
            Olá, {user?.firstname}.
          </Heading>
          <Text lineHeight="shorter" color="gray.500">
            Complete seus dados para uma melhor experiência em nossa plataforma.
          </Text>
        </Flex>
        <Flex width="full" paddingY={5}>
          <Flex
            width="full"
            backgroundColor="white"
            borderRadius="md"
            flexDirection="column"
          >
            <Flex width="full" padding={2}>
              <Menu />
            </Flex>
            <Flex width="full" paddingY={5} paddingX={7}>
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </RootLayout>
  );
};

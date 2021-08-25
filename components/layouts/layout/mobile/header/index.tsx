import { Box, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { Container } from '~/components/layouts/container';
import { Header as HeaderLayout } from '~/components/layouts/layout/header';
import { MenuContext } from '~/contexts/menu';
import { Menu } from '../../menu';
import { Navbar } from '../navbar';

interface Props {}

export const Header: React.FC<Props> = ({ children, ...props }) => {
  const { options } = useContext(MenuContext);
  return (
    <HeaderLayout>
      <Navbar />
      {options && options.length > 0 && (
        <Container overflowX="auto" overflowY="hidden">
          <Flex>
            <Menu />
          </Flex>
        </Container>
      )}
    </HeaderLayout>
  );
};

import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useContext } from 'react';
import { MenuContext } from '~/contexts/menu';
import { Footer } from '../footer';
import { Menu } from '../menu';
import { Header } from './header';

interface Props {}

export const Default: React.FC<Props> = ({ children }) => {
  const { existsMenu } = useContext(MenuContext);
  return (
    <Flex width="full" height="full" flexDir="column">
      {existsMenu && (
        <Flex
          width="250px"
          height="full"
          position="fixed"
          borderRightWidth="thin"
          backgroundColor="white"
        >
          <Menu />
        </Flex>
      )}

      <Flex
        width="full"
        flexDir="column"
        backgroundColor="gray.50"
        justifyContent="center"
        alignContent="center"
        paddingLeft={existsMenu ? '250px' : undefined}
      >
        <Header />
        {children}
        <Footer />
      </Flex>
    </Flex>
  );
};

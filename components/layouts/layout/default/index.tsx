import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Footer } from '../footer';
import { Menu } from '../menu';
import { Header } from './header';

interface Props {}

export const Default: React.FC<Props> = ({ children }) => {
  return (
    <Flex width="full" height="full" flexDir="column">
      <Flex
        width="250px"
        height="full"
        position="fixed"
        borderRightWidth="thin"
      >
        <Menu />
      </Flex>
      <Flex
        width="full"
        flexDir="column"
        backgroundColor="gray.50"
        justifyContent="center"
        alignContent="center"
        paddingLeft="250px"
      >
        <Header />
        {children}
        <Footer />
      </Flex>
    </Flex>
  );
};

import { Flex } from '@chakra-ui/react';
import { MenuContextProvider, MenuItemData } from '~/contexts/menu';
import { Default } from './default';
import { Mobile } from './mobile';

export interface LayoutProps {
  readonly menuOptions?: MenuItemData[];
}

export const Layout: React.FC<LayoutProps> = ({ menuOptions, ...props }) => {
  return (
    <MenuContextProvider options={menuOptions}>
      <Flex width="full" height="full" flexDir="column" position="relative">
        <Flex flex={1} display={['none', 'none', 'flex', 'flex']}>
          <Default {...props} />
        </Flex>
        <Flex flex={1} display={['flex', 'flex', 'none', 'none']}>
          <Mobile {...props} />
        </Flex>
      </Flex>
    </MenuContextProvider>
  );
};

import { Flex } from '@chakra-ui/react';
import { Link } from './link';

export interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({ ...props }) => {
  return (
    <Flex width="full">
      <Link href="/settings">Sobre</Link>
      <Link href="/settings/addresses">Endereços</Link>
      <Link href="/settings/avatar">Imagem de perfil</Link>
    </Flex>
  );
};

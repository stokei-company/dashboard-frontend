import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useMemo } from 'react';
import { LogoutIcon, SettingIcon, UserIcon } from '~/components/icons';
import { UserAvatar } from '~/components/ui/user-avatar';
import { AuthContext } from '~/contexts/auth';
import { AUTH_FRONTEND_URL } from '~/environments';
import { colors } from '~/styles/colors';

interface Props {}

export const UserBox: React.FC<Props> = ({ children, ...props }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const fullname = useMemo(() => {
    if (!user) {
      return;
    }
    const [name, ...rest] = user.fullname.split(' ');
    return name + ' ' + rest[rest.length - 1];
  }, [user]);

  const redirect = (url: string) => router.push(url);

  if (!user) {
    return <></>;
  }
  return (
    <Flex>
      <Menu>
        <MenuButton
          padding={1}
          transition="all 0.2s"
          _hover={{ bg: 'gray.50', borderRadius: 'sm' }}
          _expanded={{ bg: 'gray.50', borderRadius: 'sm' }}
          _focus={{ boxShadow: 'outline', borderRadius: 'sm' }}
        >
          <UserAvatar size="sm" src={user?.avatar} name={fullname} />
        </MenuButton>
        <MenuList borderRadius="sm">
          <Stack
            paddingY={2}
            paddingX={3}
            align="center"
            spacing={2}
            direction="row"
          >
            <Avatar
              size="sm"
              src={user?.avatar}
              name={fullname}
              color="white"
              backgroundColor={colors.primary.main}
            />
            <Text fontSize="sm" fontWeight="bold">
              {fullname}
            </Text>
          </Stack>
          <MenuDivider />
          <MenuGroup>
            <MenuItem
              alignItems="flex-start"
              icon={<Icon as={UserIcon} color="gray.600" />}
              onClick={() => redirect('/settings')}
            >
              Minha conta
            </MenuItem>
            <MenuItem
              alignItems="flex-start"
              icon={<Icon as={SettingIcon} color="gray.600" />}
              onClick={() => redirect('/settings')}
            >
              Configurações
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem
            alignItems="flex-start"
            icon={<Icon as={LogoutIcon} color="gray.600" />}
            onClick={() => redirect(AUTH_FRONTEND_URL + '/logout')}
          >
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

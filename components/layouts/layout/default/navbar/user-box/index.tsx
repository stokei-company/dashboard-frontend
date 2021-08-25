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
  Text,
} from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { LogoutIcon, SettingIcon, UserIcon } from "~/components/icons";
import { UserAvatar } from "~/components/ui/user-avatar";
import { AuthContext } from "~/contexts/auth";
import { ACCOUNT_FRONTEND_URL, AUTH_FRONTEND_URL } from "~/environments";
import { colors } from "~/styles/colors";

interface Props {}

export const UserBox: React.FC<Props> = ({ children, ...props }) => {
  const { user } = useContext(AuthContext);
  const fullname = useMemo(() => {
    if (!user) {
      return;
    }
    const [name, ...rest] = user.fullname.split(" ");
    return name + " " + rest[rest.length - 1];
  }, [user]);

  const redirect = (url) => (window.location.href = url);

  if (!user) {
    return <></>;
  }
  return (
    <Flex>
      <Menu>
        <MenuButton
          padding={1}
          transition="all 0.2s"
          _hover={{ bg: "gray.50", borderRadius: "sm" }}
          _expanded={{ bg: "gray.50", borderRadius: "sm" }}
          _focus={{ boxShadow: "outline", borderRadius: "sm" }}
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
              onClick={() => redirect(ACCOUNT_FRONTEND_URL)}
            >
              Minha conta
            </MenuItem>
            <MenuItem
              alignItems="flex-start"
              icon={<Icon as={SettingIcon} color="gray.600" />}
              onClick={() => redirect(ACCOUNT_FRONTEND_URL)}
            >
              Configurações
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem
            alignItems="flex-start"
            icon={<Icon as={LogoutIcon} color="gray.600" />}
            onClick={() => redirect(AUTH_FRONTEND_URL + "/logout")}
          >
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

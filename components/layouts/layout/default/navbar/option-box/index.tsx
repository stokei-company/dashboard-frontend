import {
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { HomeIcon, NotificationIcon } from "~/components/icons";

interface Props {}

export const OptionBox: React.FC<Props> = ({ children, ...props }) => {
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  return (
    <Stack direction="row" spacing={4} align="center">
      <IconButton
        aria-label="any"
        padding={2}
        variant="unstyled"
        colorScheme="gray"
        _hover={{ bg: "gray.50", borderRadius: "sm" }}
        _focus={{ boxShadow: "outline", borderRadius: "sm" }}
        onClick={() => router.push("/")}
        icon={<Icon as={HomeIcon} fontSize="xl" color="gray.400" />}
      />
      <Flex>
        <Menu>
          <MenuButton
            padding={2}
            transition="all 0.2s"
            _hover={{ bg: "gray.50", borderRadius: "sm" }}
            _expanded={{ bg: "gray.50", borderRadius: "sm" }}
            _focus={{ boxShadow: "outline", borderRadius: "sm" }}
          >
            <Icon as={NotificationIcon} fontSize="lg" color="gray.400" />
          </MenuButton>
          <MenuList borderRadius="sm">
            {notifications?.length > 0 ? (
              notifications.map((notification, i) => (
                <MenuItem width="full" key={i}>
                  <Stack
                    direction="column"
                    align="center"
                    spacing="0"
                    justifyContent="flex-start"
                  >
                    <Flex width="full">
                      <Text fontSize="sm" fontWeight="bold">
                        {notification.title}
                      </Text>
                    </Flex>
                    {notification.content && (
                      <Flex width="full">
                        <Text fontSize="xs" color="gray.500">
                          {notification.content}
                        </Text>
                      </Flex>
                    )}
                  </Stack>
                </MenuItem>
              ))
            ) : (
              <Text fontSize="xs" color="gray.500" textAlign="center">
                Nenhuma notificação.
              </Text>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Stack>
  );
};

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Spacer,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { MenuIcon } from '~/components/icons';
import { Container } from '~/components/layouts/container';
import { Image } from '~/components/ui/image';
import { AuthContext } from '~/contexts/auth';
import { MenuContext } from '~/contexts/menu';
import { logoIconCleanUrl } from '~/utils/constants';
import { Menu } from '../../menu';
import { OptionBox } from './option-box';
import { UserBox } from '../../user-box';
import { Course } from '../../course';

interface Props {}

export const Navbar: React.FC<Props> = ({ ...props }) => {
  const { authenticated } = useContext(AuthContext);
  const { options } = useContext(MenuContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const drawerRef = useRef();

  return (
    <Container as="nav" width="full">
      <Flex alignItems="center" paddingY={3}>
        {options && options.length > 0 && (
          <>
            <Flex marginRight={5}>
              <Icon
                as={MenuIcon}
                fontSize="lg"
                color="gray.400"
                onClick={() => onOpen()}
                cursor="pointer"
              />
            </Flex>
            <Drawer
              placement="left"
              initialFocusRef={drawerRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <Menu />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
        <Image
          src={logoIconCleanUrl}
          height="25px"
          fallbackSrc="/icon-clean.png"
          alt="logo"
        />
        <Spacer />
        <Course />
        <Spacer />
        {authenticated && (
          <Stack direction="row" spacing={4} align="center">
            <OptionBox />
            <UserBox />
          </Stack>
        )}
      </Flex>
    </Container>
  );
};

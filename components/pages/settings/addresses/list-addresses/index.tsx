import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import router from 'next/router';
import { useCallback, useRef } from 'react';
import { FormAddAccountAddress } from '~/components/forms/form-add-account-address';
import { AddressIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { AddressModel } from '~/services/@types/address';
import { Address } from '../address';

export interface ListAddressesProps {
  readonly addresses: AddressModel[];
}

export const ListAddresses: React.FC<ListAddressesProps> = ({
  addresses,
  ...props
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const drawerRef = useRef();

  const handleAddAddress = useCallback((address) => {
    router.reload();
  }, []);

  return (
    <Flex width="full">
      {addresses?.length > 0 ? (
        addresses.map((address) => (
          <Address key={address.id} address={address} />
        ))
      ) : (
        <Flex
          width="full"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            width="100px"
            height="100px"
            padding={10}
            borderRadius="full"
            backgroundColor="green.100"
            marginBottom={3}
            alignItems="center"
            justifyContent="center"
          >
            <Icon w={8} h={8} as={AddressIcon} />
          </Flex>
          <Flex width="full" alignItems="center" justifyContent="center">
            <Text textAlign="center" color="gray.500">
              Adicione um endereço para facilitar sua vida na hora das compras.
            </Text>
          </Flex>
          <Flex
            width="full"
            paddingY={3}
            alignItems="center"
            justifyContent="center"
          >
            <Button onClick={() => onOpen()}>Adicionar</Button>
          </Flex>
          <Drawer
            isOpen={isOpen}
            placement="right"
            initialFocusRef={drawerRef}
            onClose={onClose}
            size="md"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">Novo endereço</DrawerHeader>

              <DrawerBody>
                <FormAddAccountAddress onSuccess={handleAddAddress} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      )}
    </Flex>
  );
};

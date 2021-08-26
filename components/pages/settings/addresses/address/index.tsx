import { Flex } from '@chakra-ui/react';
import { AddressModel } from '~/services/@types/address';
export interface AddressProps {
  readonly address: AddressModel;
}

export const Address: React.FC<AddressProps> = ({ address, ...props }) => {
  return <Flex width="full">{address.id}</Flex>;
};

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader
} from '@chakra-ui/react';
import React from 'react';
import { FormAddCourseSubscription } from '~/components/forms/form-add-course-subscription';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => any;
  readonly onSuccess: () => any;
  readonly firstField: any;
}

export const AddCourseSubscription: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  firstField,
  ...props
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Adicionar assinatura</DrawerHeader>
        <DrawerBody paddingTop={5}>
          <FormAddCourseSubscription onSuccess={onSuccess} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

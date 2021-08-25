import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import { FormAddCourse } from "~/components/forms/form-add-course";

interface Props {
  readonly appId: string;
  readonly isOpen: boolean;
  readonly onClose: () => any;
  readonly onSuccess: () => any;
  readonly firstField: any;
}

export const AddCourse: React.FC<Props> = ({
  isOpen,
  appId,
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
        <DrawerHeader borderBottomWidth="1px">Novo curso</DrawerHeader>

        <DrawerBody>
          <FormAddCourse appId={appId} onSuccess={onSuccess} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

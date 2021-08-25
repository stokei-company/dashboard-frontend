import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay
} from "@chakra-ui/react";
import React from "react";
import { FormAddModule } from "~/components/forms/form-add-module";

interface Props {
  readonly courseId: string;
  readonly appId: string;
  readonly isOpen: boolean;
  readonly onClose: () => any;
  readonly onSuccess: () => any;
  readonly firstField: any;
}

export const AddModule: React.FC<Props> = ({
  isOpen,
  courseId,
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
        <DrawerHeader borderBottomWidth="1px">Novo modulo</DrawerHeader>

        <DrawerBody>
          <FormAddModule
            appId={appId}
            onSuccess={onSuccess}
            courseId={courseId}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
} from "@chakra-ui/react";
import React from "react";
import { FormAddCourseUser } from "~/components/forms/form-add-course-user";

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => any;
  readonly onSuccess: () => any;
  readonly firstField: any;
}

export const AddCourseUser: React.FC<Props> = ({
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
        <DrawerHeader>Adicionar aluno</DrawerHeader>
        <DrawerBody paddingTop={5}>
          <FormAddCourseUser onSuccess={onSuccess} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

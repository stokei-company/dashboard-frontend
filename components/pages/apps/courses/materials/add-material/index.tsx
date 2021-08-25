import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import React from "react";
import { FormAddCourseMaterial } from "~/components/forms/form-add-course-material";

interface Props {
  readonly appId: string;
  readonly courseId: string;
  readonly isOpen: boolean;
  readonly onClose: () => any;
  readonly onSuccess: () => any;
  readonly firstField: any;
}

export const AddMaterial: React.FC<Props> = ({
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
        <DrawerHeader borderBottomWidth="1px">Novo material</DrawerHeader>

        <DrawerBody>
          <FormAddCourseMaterial courseId={courseId} appId={appId} onSuccess={onSuccess} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

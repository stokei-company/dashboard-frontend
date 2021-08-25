import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FormAddVideo } from "~/components/forms/form-add-video";
import { AppContext } from "~/contexts/app";

interface Props {
  readonly moduleId: string;
  readonly moduleName: string;
  readonly isOpen: boolean;
  readonly onClose: () => any;
  readonly onSuccess: () => any;
  readonly firstField: any;
}

export const AddVideo: React.FC<Props> = ({
  isOpen,
  moduleId,
  moduleName,
  onClose,
  onSuccess,
  firstField,
  ...props
}) => {
  const { app } = useContext(AppContext);
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
        <DrawerHeader borderBottomWidth="1px">{moduleName}</DrawerHeader>

        <DrawerBody paddingTop={6}>
          <FormAddVideo
            appId={app?.id}
            onSuccess={onSuccess}
            moduleId={moduleId}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

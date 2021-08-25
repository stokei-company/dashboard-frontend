import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import { VideoModel } from "~/services/@types/video";
import { FormUpdateVideo } from "~/components/forms/form-update-video";

interface Props {
  readonly video: VideoModel;
  readonly moduleId: string;
  readonly moduleName: string;
  readonly appId: string;
  readonly isOpen: boolean;
  readonly onClose: () => any;
  readonly onSuccess: () => any;
  readonly firstField: any;
}

export const UpdateVideo: React.FC<Props> = ({
  isOpen,
  moduleId,
  video,
  moduleName,
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
        <DrawerHeader borderBottomWidth="1px">{moduleName}</DrawerHeader>

        <DrawerBody paddingTop={6}>
          <FormUpdateVideo
            moduleId={moduleId}
            appId={appId}
            onSuccess={onSuccess}
            video={video}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

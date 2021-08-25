import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { VideoModel } from "~/services/@types/video";
import { VideoPlayer } from "~/components/ui/video-player";
import { Markdown } from "~/components/ui/markdown";

interface Props {
  readonly video: VideoModel;
  readonly isOpen: boolean;
  readonly onClose: () => any;
}

export const VideoView: React.FC<Props> = ({ isOpen, onClose, video }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent marginX={5}>
        {video?.title && <ModalHeader>{video?.title}</ModalHeader>}

        <ModalCloseButton />

        <ModalBody paddingBottom="10">
          <VideoPlayer url={video?.url} thumbnail={video?.thumbnail} />
          {video?.description && (
            <Flex marginTop="5">
              <Markdown content={video?.description} />
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

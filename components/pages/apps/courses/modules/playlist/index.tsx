import { Box, Flex, Text } from '@chakra-ui/react';
import { VideoModel } from '~/services/@types/video';
import { Video } from '../video';

interface Props {
  readonly moduleName: string;
  readonly moduleId: string;
  readonly videos: VideoModel[];
}

export const Playlist: React.FC<Props> = ({ videos, moduleId, moduleName }) => {
  return (
    <Flex flexDir="column" width="full">
      {(!videos || videos.length === 0) && (
        <Text color="gray.500">Nenhum video encontrado.</Text>
      )}
      {videos?.length > 0 &&
        videos?.map((video) => (
          <Box key={video.id} marginBottom="5">
            <Video moduleId={moduleId} moduleName={moduleName} video={video} />
          </Box>
        ))}
    </Flex>
  );
};

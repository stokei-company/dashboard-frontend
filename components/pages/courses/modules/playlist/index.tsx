import { Box, Stack, Text } from '@chakra-ui/react';
import { VideoModel } from '~/services/@types/video';
import { Video } from '../video';

interface Props {
  readonly moduleId: string;
  readonly videos: VideoModel[];
  readonly currentVideoId?: string;
}

export const Playlist: React.FC<Props> = ({
  moduleId,
  currentVideoId,
  videos
}) => {
  return (
    <Stack direction="column" width="full" spacing={2}>
      {(!videos || videos.length === 0) && (
        <Text color="gray.500">Nenhum video encontrado.</Text>
      )}
      {videos?.length > 0 &&
        videos?.map((video) => (
          <Box
            key={video.id}
            borderRadius="sm"
            backgroundColor={
              video.id === currentVideoId ? 'gray.100' : undefined
            }
            _hover={{
              backgroundColor: 'gray.100'
            }}
          >
            <Video video={video} />
          </Box>
        ))}
    </Stack>
  );
};

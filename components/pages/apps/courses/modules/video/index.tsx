import { Badge, Flex, Heading, Image, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { memo, useContext, useEffect, useMemo } from 'react';
import { Card } from '~/components/ui/card';
import { Markdown } from '~/components/ui/markdown';
import { AppContext } from '~/contexts/app';
import { useRequest } from '~/hooks/use-request';
import { VideoModel } from '~/services/@types/video';
import { CourseVideoServiceRest } from '~/services/rest-api/services/course-video/course-video.service';
import { colors } from '~/styles/colors';
import { UpdateVideo } from '../update-video';
import styles from './style.module.css';
import { VideoView } from './video-view';

interface Props {
  readonly moduleName: string;
  readonly video: VideoModel;
  readonly moduleId: string;
}
const statusSchema = {
  pending: {
    colorScheme: 'orange',
    text: 'Pendente'
  },
  encoding: {
    colorScheme: 'blue',
    text: 'Convertendo'
  },
  saving: {
    colorScheme: 'cyan',
    text: 'Salvando'
  },
  available: {
    colorScheme: 'green',
    text: 'Ok'
  },
  finished: {
    colorScheme: 'red',
    text: 'Finalizado'
  }
};

export const Video: React.FC<Props> = memo(
  ({ video, moduleName, moduleId }) => {
    const router = useRouter();
    const firstFieldUpdateVideo = React.useRef();
    const { app } = useContext(AppContext);
    const courseVideoService = new CourseVideoServiceRest({
      moduleId,
      appId: app?.id
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
      isOpen: isOpenUpdateVideo,
      onOpen: onOpenUpdateVideo,
      onClose: onCloseUpdateVideo
    } = useDisclosure();

    const {
      loading: loadingRemove,
      data: dataRemove,
      submit: removeVideo
    } = useRequest({
      submit: () => courseVideoService.delete(video?.id)
    });

    const status: {
      colorScheme: string;
      text: string;
    } = useMemo(() => {
      return statusSchema[video.status] || statusSchema.pending;
    }, [video.status]);

    useEffect(() => {
      if (dataRemove) {
        router.reload();
      }
    }, [router, dataRemove]);

    return (
      <Card
        boxShadow="none"
        padding={0}
        title={
          <Flex
            alignItems="center"
            maxWidth={['130px', '130px', 'full', 'full']}
          >
            <Heading
              width="full"
              size="sm"
              color={colors.primary.main}
              lineHeight="shorter"
              isTruncated
            >
              {video.title}
            </Heading>
          </Flex>
        }
        subtitle={
          <Flex flexDirection="column">
            {video.description && (
              <Flex
                className={styles['description']}
                alignItems="flex-start"
                maxWidth="100px"
                maxHeight="20px"
                fontSize="xs"
                isTruncated
              >
                <Markdown content={video?.description} />
              </Flex>
            )}
            <Flex>
              <Badge
                marginTop="1"
                paddingY="2px"
                paddingX="8px"
                colorScheme={status.colorScheme}
              >
                {status.text}
              </Badge>
            </Flex>
          </Flex>
        }
        menu={[
          {
            text: 'Visualizar',
            onClick: () => onOpen()
          },
          {
            text: 'Alterar',
            onClick: () => onOpenUpdateVideo()
          },
          {
            text: 'Remover',
            loadingText: 'Removendo...',
            loading: loadingRemove,
            color: 'red.500',
            onClick: () => !loadingRemove && removeVideo()
          }
        ]}
        avatar={
          <Flex alignItems="center" justifyContent="center">
            <Image
              width={['100px', '100px', '150px', '150px']}
              src={video.thumbnail}
              fallbackSrc="/no-thumbnail.png"
              alt="Thumbnail"
            />
          </Flex>
        }
        body={
          <>
            <VideoView video={video} isOpen={isOpen} onClose={onClose} />
            <UpdateVideo
              video={video}
              appId={app?.id}
              moduleId={moduleId}
              firstField={firstFieldUpdateVideo}
              isOpen={isOpenUpdateVideo}
              moduleName={moduleName}
              onClose={onCloseUpdateVideo}
              onSuccess={() => router.reload()}
            />
          </>
        }
      />
    );
  }
);

Video.displayName = 'Video';

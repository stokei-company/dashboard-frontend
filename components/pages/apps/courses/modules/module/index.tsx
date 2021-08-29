import {
  Flex,
  Heading,
  Icon,
  Link,
  Skeleton,
  Spacer,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { memo, useContext, useEffect } from 'react';
import { PlusIcon } from '~/components/icons';
import { ButtonOutlined } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { AppContext } from '~/contexts/app';
import { useModuleVideos } from '~/hooks/use-module-videos';
import { useRequest } from '~/hooks/use-request';
import { ModuleModel } from '~/services/@types/module';
import { CourseModuleServiceRest } from '~/services/rest-api/services/course-module/course-module.service';
import { colors } from '~/styles/colors';
import { AddVideo } from '../add-video';
import { Playlist } from '../playlist';

interface Props {
  readonly module: ModuleModel;
  readonly courseId: string;
}

export const Module: React.FC<Props> = memo(({ module, courseId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const { app } = useContext(AppContext);
  const router = useRouter();
  const courseModuleService = new CourseModuleServiceRest({
    courseId,
    appId: app?.id
  });

  const { videos: playlist, loading } = useModuleVideos({
    appId: app?.id,
    moduleId: module?.id
  });

  const {
    loading: loadingRemove,
    data: dataRemove,
    submit: removeModulo
  } = useRequest({
    submit: () => courseModuleService.delete(module?.id)
  });

  useEffect(() => {
    if (dataRemove) {
      router.reload();
    }
  }, [router, dataRemove]);

  return (
    <Card
      body={
        <>
          <Flex alignItems="center">
            <Heading size="md" color={colors.primary.main} lineHeight="shorter">
              {module.name}
            </Heading>
            <Spacer />
            <Stack>
              <ButtonOutlined
                onClick={() => onOpen()}
                leftIcon={<Icon as={PlusIcon} />}
              >
                Adicionar
              </ButtonOutlined>
              <AddVideo
                firstField={firstField}
                isOpen={isOpen}
                moduleId={module.id}
                moduleName={module.name}
                onSuccess={() => router.reload()}
                onClose={() => onClose()}
              />
            </Stack>
          </Flex>
          <Skeleton isLoaded={!loading}>
            <Flex alignItems="center">
              <Playlist
                moduleId={module.id}
                moduleName={module.name}
                videos={playlist?.items || []}
              />
            </Flex>
          </Skeleton>
        </>
      }
      footer={
        <Link
          colorScheme="red"
          color="red.500"
          onClick={() => !loadingRemove && removeModulo()}
          fontSize="xs"
        >
          {loadingRemove ? 'Removendo...' : 'Remover modulo'}
        </Link>
      }
    />
  );
});

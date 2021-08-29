import { Flex, Heading, Icon, Skeleton, Stack } from '@chakra-ui/react';
import React, { memo, useContext, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '~/components/icons';
import { Card } from '~/components/ui/card';
import { AppContext } from '~/contexts/app';
import { useModuleVideos } from '~/hooks/use-module-videos';
import { ModuleModel } from '~/services/@types/module';
import { colors } from '~/styles/colors';
import { Playlist } from '../playlist';

interface Props {
  readonly module: ModuleModel;
  readonly open?: boolean;
  readonly currentVideoId?: string;
}

export const Module: React.FC<Props> = memo(
  ({ open: isOpen, module, currentVideoId }) => {
    const [open, setOpen] = useState(isOpen === true);
    const { app } = useContext(AppContext);
    const { videos: playlist, loading } = useModuleVideos({
      moduleId: module?.id,
      appId: app?.id
    });

    return (
      <Card
        body={
          <>
            <Stack
              flexDir="row"
              align="center"
              justify="space-between"
              alignItems="center"
              onClick={() => setOpen((oldOpen) => !oldOpen)}
              cursor="pointer"
            >
              <Heading size="sm" color={colors.primary.main} lineHeight="none">
                {module.name}
              </Heading>
            </Stack>
            {open && (
              <Skeleton isLoaded={!loading}>
                <Flex flex={1} alignItems="center">
                  <Playlist
                    moduleId={module?.id}
                    videos={playlist?.items || []}
                    currentVideoId={currentVideoId}
                  />
                </Flex>
              </Skeleton>
            )}
          </>
        }
      />
    );
  }
);

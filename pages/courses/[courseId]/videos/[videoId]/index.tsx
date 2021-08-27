import { Flex, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/pages/courses/layout';
import ListModules from '~/components/pages/courses/modules/list-modules';
import { Description } from '~/components/pages/courses/videos/description';
import { Title } from '~/components/pages/courses/videos/title';
import { Card } from '~/components/ui/card';
import { VideoPlayer } from '~/components/ui/video-player';
import { ModuleModel } from '~/services/@types/module';
import { VideoModel } from '~/services/@types/video';
import { CourseModuleServiceRest } from '~/services/rest-api/services/course-module/course-module.service';
import { VideoServiceRest } from '~/services/rest-api/services/video/video.service';
import { desconnectedUrl } from '~/utils/constants';

interface Props {
  readonly courseId: string;
  readonly video: VideoModel;
  readonly modules: ModuleModel[];
}
export default function Home({ video, courseId, modules, ...props }: Props) {
  return (
    <Layout>
      <Container paddingY={8}>
        <Stack
          width="full"
          spacing={5}
          direction={['column', 'column', 'row', 'row']}
        >
          <Flex flex={1} flexDir="column">
            <Card
              body={
                <>
                  <VideoPlayer url={video?.url} />
                  <Title title={video?.title} />
                  {video?.description && (
                    <Description description={video?.description} />
                  )}
                </>
              }
            />
          </Flex>
          <Flex
            width={['full', 'full', '350px', '350px']}
            paddingBottom="50"
            flexDir="column"
          >
            <ListModules modules={modules} currentVideoId={video?.id} openAll />
          </Flex>
        </Stack>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoService = new VideoServiceRest({ context });
  if (!videoService.accessToken) {
    return {
      redirect: {
        destination: desconnectedUrl(videoService.appId),
        permanent: false
      }
    };
  }

  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : '';
  const videoId = context?.params?.videoId ? context?.params?.videoId + '' : '';
  const video = await videoService.findById(videoId);
  if (!video) {
    return {
      notFound: true
    };
  }
  const moduleService = new CourseModuleServiceRest({ context, courseId });

  return {
    props: {
      video,
      modules: (await moduleService.findAll()) || [],
      courseId
    }
  };
};

import { Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { memo, useContext } from "react";
import { Card } from "~/components/ui/card";
import { Markdown } from "~/components/ui/markdown";
import { CourseContext } from "~/contexts/course";
import { VideoModel } from "~/services/@types/video";
import { colors } from "~/styles/colors";
import styles from "./style.module.css";

interface Props {
  readonly video: VideoModel;
}

export const Video: React.FC<Props> = memo(({ video }) => {
  const { baseUrl } = useContext(CourseContext);
  return (
    <NextLink href={`${baseUrl}/videos/${video.id}`}>
      <Link
        _hover={{
          textDecoration: "none",
        }}
        _active={{
          textDecoration: "none",
        }}
        _focus={{
          textDecoration: "none",
        }}
      >
        <Card
          className={styles["card"]}
          boxShadow="none"
          padding={0}
          backgroundColor="transparent"
          avatar={
            <Flex alignItems="center" justifyContent="center">
              <Image
                width="100px"
                src={video.thumbnail}
                fallbackSrc="/no-thumbnail.png"
                alt="Thumbnail"
              />
            </Flex>
          }
          title={
            <Flex
              alignItems="center"
              maxWidth={["130px", "130px", "full", "full"]}
            >
              <Heading
                width="full"
                size="xs"
                color={colors.primary.main}
                lineHeight="shorter"
                isTruncated
              >
                {video.title}
              </Heading>
            </Flex>
          }
          subtitle={
            video.description && (
              <Flex alignItems="center" maxWidth="100px">
                <Text
                  fontSize="xs"
                  isTruncated
                  className={styles["description"]}
                >
                  <Markdown content={video?.description} />
                </Text>
              </Flex>
            )
          }
        />
      </Link>
    </NextLink>
  );
});

Video.displayName = "Video";

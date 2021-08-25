import { Box } from "@chakra-ui/layout";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

interface Props {
  readonly url: string;
  readonly thumbnail?: string;
}

export const VideoPlayer: React.FC<Props> = ({ url, thumbnail, ...props }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <Box width="full" position="relative" paddingTop="56.25%">
      <ReactPlayer
        controls
        className="react-player"
        width="100%"
        height="100%"
        light={thumbnail || false}
        onClickPreview={() => setPlaying(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        playing={playing}
        url={url}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", //<- this is the important bit
            },
          },
        }}
        {...props}
      />
    </Box>
  );
};

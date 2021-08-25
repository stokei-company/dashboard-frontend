import React, { ReactNode } from "react";
import { InputFile, InputFileProps } from "../input-file";
import { VideoPlayer } from "../video-player";

interface Props extends InputFileProps {}

export const InputFileVideo: React.FC<Props> = ({ onChange, ...props }) => {
  return (
    <InputFile
      {...props}
      accept="video/mp4"
      formats={["video/mp4"]}
      onChange={onChange}
      previewElement={(fileUrl: string) => <VideoPlayer url={fileUrl} />}
    />
  );
};

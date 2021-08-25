import React from "react";
import { Image as ChakraImage, ImageProps } from "@chakra-ui/react";

export const Image: React.FC<ImageProps> = (props) => {
  return <ChakraImage {...props} />;
};

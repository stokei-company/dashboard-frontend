import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from "@chakra-ui/react";
import React from "react";

export const AppLogo: React.FC<ChakraImageProps> = (props) => {
  return (
    <ChakraImage fallbackSrc="/default-logo-app.png" alt="LogoApp" {...props} />
  );
};

import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Image,
} from "@chakra-ui/react";

import { FaFacebook } from "react-icons/fa";
import { colors } from "~/styles/colors";

const height = "40px";

export const Button: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || "white"}
      backgroundColor={props.backgroundColor || colors.primary.main}
      height={height}
      minHeight={height}
      borderRadius="full"
      paddingX="24px"
      _hover={{
        ...props._hover,
        backgroundColor: props._hover?.backgroundColor || colors.primary.light,
      }}
      {...props}
    />
  );
};

export const ButtonClean: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || colors.primary.main}
      height={height}
      minHeight={height}
      borderRadius="full"
      paddingX="24px"
      variant="ghost"
      {...props}
    />
  );
};

export const ButtonOutlined: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || colors.primary.main}
      borderColor={props.borderColor || colors.primary.main}
      height={height}
      minHeight={height}
      borderRadius="full"
      paddingX="24px"
      variant="outline"
      {...props}
    />
  );
};

export const FacebookButton: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      backgroundColor="#e9effb"
      color="black.200"
      leftIcon={<FaFacebook color="#385898" size="18px" />}
      height={height}
      minHeight={height}
      borderRadius="full"
      paddingX="24px"
      _active={{
        ...props._active,
        backgroundColor: "gray.300",
      }}
      _focus={{
        ...props._focus,
        backgroundColor: "gray.300",
      }}
      _hover={{
        ...props._hover,
        backgroundColor: "gray.300",
      }}
      {...props}
    />
  );
};

export const GoogleButton: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      backgroundColor="#e9effb"
      color="black.200"
      leftIcon={<Image src="/google_logo.png" boxSize="15px" alt="google" />}
      height={height}
      minHeight={height}
      borderRadius="full"
      paddingX="24px"
      _active={{
        ...props._active,
        backgroundColor: "gray.300",
      }}
      _focus={{
        ...props._focus,
        backgroundColor: "gray.300",
      }}
      _hover={{
        ...props._hover,
        backgroundColor: "gray.300",
      }}
      {...props}
    />
  );
};

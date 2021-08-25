import { Flex, Image } from "@chakra-ui/react";
import React from "react";

export interface CardImg {
  readonly image: string;
}

export const CardImg: React.FC<CardImg> = ({ image, children }) => {
  return (
    <Flex overflow="hidden" borderTopRadius="sm">
      <Image src={image} alt="image" width="full" />
    </Flex>
  );
};

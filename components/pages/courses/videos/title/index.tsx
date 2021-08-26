import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface Props {
  readonly title: string;
}

export const Title: React.FC<Props> = ({ title }) => {
  return (
    <Flex alignItems="center" marginBottom={5}>
      <Heading size="lg" lineHeight="shorter">
        {title}
      </Heading>
    </Flex>
  );
};

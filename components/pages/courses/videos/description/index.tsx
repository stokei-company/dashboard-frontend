import { Flex } from "@chakra-ui/react";
import React from "react";
import { Markdown } from "~/components/ui/markdown";

interface Props {
  readonly description: string;
}

export const Description: React.FC<Props> = ({ description }) => {
  return (
    <Flex alignItems="center" marginBottom={10}>
      <Markdown content={description} />
    </Flex>
  );
};

import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const NoSubscription: React.FC<Props> = ({ ...props }) => {
  return (
    <Flex width="full" flexDir="column" marginBottom={10}>
      <Text size="md" lineHeight="shorter">
        Você ainda não possui assinaturas.
      </Text>
    </Flex>
  );
};

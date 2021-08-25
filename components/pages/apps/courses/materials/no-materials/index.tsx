import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const NoMaterial: React.FC<Props> = ({ ...props }) => {
  return (
    <Flex justifyContent="center" flexDir="column">
      <Text>Adicione aqui os materiais do curso.</Text>
    </Flex>
  );
};

import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const NoUser: React.FC<Props> = ({ ...props }) => {
  return (
    <Flex justifyContent="center" flexDir="column">
      <Text>Nenhum aluno encontrado.</Text>
    </Flex>
  );
};

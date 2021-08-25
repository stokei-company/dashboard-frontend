import { Flex } from "@chakra-ui/react";
import { Footer } from "../footer";
import { Header } from "./header";

interface Props {}

export const Mobile: React.FC<Props> = ({ children }) => {
  return (
    <Flex width="full" height="full" flexDir="column">
      <Header />
      <Flex
        width="full"
        flexDir="column"
        backgroundColor="gray.50"
        justifyContent="center"
        alignContent="center"
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

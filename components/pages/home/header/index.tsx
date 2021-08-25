import { Flex, Heading } from "@chakra-ui/react";

interface Props {
  readonly title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <Flex flexDir="column" alignItems="flex-start" marginBottom={10}>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
    </Flex>
  );
};

export default Header;

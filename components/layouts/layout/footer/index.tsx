import { Flex, Link, Text } from "@chakra-ui/react";
import { colors } from "~/styles/colors";
import { landingPageUrl, SITE_NAME } from "~/utils/constants";

interface Props {}

export const Footer: React.FC<Props> = (props) => {
  return (
    <Flex
      as="footer"
      width="100%"
      justifyContent="center"
      alignItems="center"
      paddingY={5}
      paddingX={10}
      borderTopWidth="thin"
      backgroundColor="white"
    >
      <Text fontSize="xs">
        Copyright ©{" "}
        <Link href={landingPageUrl} isExternal color={colors.primary.main}>
          {SITE_NAME}
        </Link>{" "}
        - Todos os direitos reservados
      </Text>
    </Flex>
  );
};

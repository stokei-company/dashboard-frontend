import { Flex, Spacer, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Container } from "~/components/layouts/container";
import { Image } from "~/components/ui/image";
import { AuthContext } from "~/contexts/auth";
import { logoIconCleanUrl } from "~/utils/constants";
import { OptionBox } from "./option-box";
import { UserBox } from "./user-box";

interface Props {}

export const Navbar: React.FC<Props> = ({ ...props }) => {
  const { authenticated } = useContext(AuthContext);
  return (
    <Container as="nav" width="full">
      <Flex alignItems="center" paddingY={3}>
        <Image
          src={logoIconCleanUrl}
          height="30px"
          fallbackSrc="/icon-clean.png"
          alt="logo"
        />
        <Spacer />
        {authenticated && (
          <Stack direction="row" spacing={4} align="center">
            <OptionBox />
            <UserBox />
          </Stack>
        )}
      </Flex>
    </Container>
  );
};

import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Container } from "~/components/layouts/container";
import { AppAvatar } from "~/components/ui/app-avatar";
import { AppContext } from "~/contexts/app";

interface Props {}

export const Header: React.FC<Props> = ({ ...props }) => {
  const { app, loading } = useContext(AppContext);
  return (
    <Flex
      width="full"
      alignItems="center"
      borderBottomWidth="thin"
      backgroundColor="white"
    >
      <Container paddingY={10}>
        <Stack direction="row" spacing={3} align="center">
          <AppAvatar name={app?.name} src={app?.logo} size="lg" />
          <Heading size="lg" lineHeight="shorter">
            {app?.name}
          </Heading>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Header;

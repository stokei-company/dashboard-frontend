import { Flex, Heading, Text } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { Layout } from "~/components/layouts/layout";
import { Button } from "~/components/ui/button";
import { AppContext } from "~/contexts/app";
import { AUTH_FRONTEND_URL } from "~/environments";
import { mountUri } from "~/utils/uri/mount-uri";

export default function Home({ ...props }) {
  const { app } = useContext(AppContext);

  const redirectUrl = useCallback(async () => {
    const appId = app?.id;

    let values = window.location.href.split("/");
    values.pop();

    const redirectUri = values.join("/");
    const href = await mountUri(AUTH_FRONTEND_URL, [
      {
        key: "redirectUri",
        value: redirectUri,
      },
      appId && {
        key: "appId",
        value: appId + "",
      },
    ]);
    window.location.href = href;
  }, [app]);

  return (
    <Layout>
      <Flex flexDir="column">
        <Flex
          paddingY={50}
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading size="xl" lineHeight="shorter">
            Você está desconectado!
          </Heading>
          <Text size="lg" marginBottom={7}>
            Volte para pagina inicial e faça login.
          </Text>
          <Button onClick={() => redirectUrl()}>Pagina inicial</Button>
        </Flex>
      </Flex>
    </Layout>
  );
}

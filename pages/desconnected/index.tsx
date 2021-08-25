import { Flex, Heading, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { Container } from "~/components/layouts/container";
import { Layout } from "~/components/layouts/layout";
import { Button } from "~/components/ui/button";
import { AUTH_FRONTEND_URL } from "~/environments";
import { mountUri } from "~/utils/uri/mount-uri";

export default function Home({ ...props }) {
  const redirectUrl = useCallback(async () => {
    let values = window.location.href.split("/");
    await values.pop();
    const redirectUri = values.join("/");
    const href = await mountUri(AUTH_FRONTEND_URL, [
      {
        key: "redirectUri",
        value: redirectUri,
      },
    ]);
    window.location.href = href;
  }, []);

  return (
    <Layout>
      <Container>
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
      </Container>
    </Layout>
  );
}

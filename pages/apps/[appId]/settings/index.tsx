import { Box } from "@chakra-ui/react";
import { Layout } from "~/components/layouts/apps/layout";
import { Container } from "~/components/layouts/container";

export default function Home({ app, ...props }) {
  return (
    <Layout>
      <Container justifyContent="center" paddingY="50">
        <Box
          width="100%"
          backgroundColor="white"
          borderRadius="md"
          padding={16}
        >
          Configurações do App
        </Box>
      </Container>
    </Layout>
  );
}

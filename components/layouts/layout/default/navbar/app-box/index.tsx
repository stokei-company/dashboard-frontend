import { Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext, useMemo } from "react";
import { AppAvatar } from "~/components/ui/app-avatar";
import { AppContext } from "~/contexts/app";

interface Props {}

export const AppBox: React.FC<Props> = ({ children, ...props }) => {
  const { app, baseUrl } = useContext(AppContext);
  const firstname = useMemo(() => {
    if (!app) {
      return;
    }
    const [name, ...rest] = app.name.split(" ");
    return name;
  }, [app]);

  if (!app) {
    return <></>;
  }
  return (
    <NextLink href={baseUrl}>
      <Link _hover={{ textDecoration: "none" }}>
        <Stack align="center" spacing={2} direction="row">
          <AppAvatar size="sm" src={app?.logo} name={firstname} />
          <Text display="flex" fontSize="sm" fontWeight="bold">
            {firstname}
          </Text>
        </Stack>
      </Link>
    </NextLink>
  );
};

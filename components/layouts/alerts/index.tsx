import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Stack,
  CloseButton,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AlertsContext } from "~/contexts/alerts";

interface Props {}

export const Alerts: React.FC<Props> = (props) => {
  const { alerts, removeAlert } = useContext(AlertsContext);
  return (
    <Flex
      width={["full", "full", "md", "md"]}
      maxH="full"
      position="fixed"
      right={0}
      bottom={0}
      zIndex={3000}
      padding={alerts?.length ? 5 : 0}
    >
      <Stack width="full" spacing={3} overflowY="auto">
        {alerts?.map((alert, i) => (
          <Alert key={i} status={alert.status} height="auto">
            {alert.title && <AlertTitle mr={2}>{alert.title}</AlertTitle>}
            <AlertIcon />
            <AlertDescription>{alert.text}</AlertDescription>
            <CloseButton
              onClick={() => removeAlert(i)}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
        ))}
      </Stack>
    </Flex>
  );
};

import {
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { PlusIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { AddModule } from "../add-module";

interface Props {
  readonly title: string;
  readonly courseId: string;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const Header: React.FC<Props> = ({
  title,
  courseId,
  appId,
  onSuccess,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
    <Flex alignItems="center" marginBottom={10}>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
      <Spacer />
      <Stack>
        <Button onClick={() => onOpen()} leftIcon={<Icon as={PlusIcon} />}>
          Adicionar
        </Button>
        <AddModule
          courseId={courseId}
          onSuccess={onSuccess}
          isOpen={isOpen}
          onClose={onClose}
          appId={appId}
          firstField={firstField}
        />
      </Stack>
    </Flex>
  );
};

export default Header;

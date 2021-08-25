import {
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { PlusIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { AddMaterial } from "../add-material";

interface Props {
  readonly courseId: string;
  readonly title: string;
  readonly appId: string;
}

export const Header: React.FC<Props> = ({ title, courseId, appId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const router = useRouter();

  return (
    <Flex alignItems="flex-start" justifyContent="center" marginBottom={10}>
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
      <Spacer />
      <Stack>
        <AddMaterial
          courseId={courseId}
          firstField={firstField}
          appId={appId}
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={() => router.reload()}
        />
        <Button onClick={() => onOpen()} leftIcon={<Icon as={PlusIcon} />}>
          Adicionar
        </Button>
      </Stack>
    </Flex>
  );
};

export default Header;

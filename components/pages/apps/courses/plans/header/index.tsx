import { Flex, Heading, Spacer, Stack, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useContext } from "react";
import { Button } from "~/components/ui/button";
import Select from "~/components/ui/select";
import { CourseContext } from "~/contexts/course";
import { AddPlan } from "../add-plan";

interface Props {
  readonly title: string;
  readonly courseId: string;
  readonly appId: string;
}

export const Header: React.FC<Props> = ({ title, courseId, appId }) => {
  const router = useRouter();
  const { baseUrl } = useContext(CourseContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const handleSkuStatus = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      router.push(baseUrl + `/plans?active=${e?.target?.value}`);
    },
    [baseUrl, router]
  );

  return (
    <Stack
      direction={["column", "column", "row", "row"]}
      alignItems="flex-start"
      justifyContent="center"
      marginBottom={10}
    >
      <Heading size="xl" lineHeight="shorter">
        {title}
      </Heading>
      <Spacer />
      <Stack
        direction={["column", "column", "row", "row"]}
        spacing={[2, 2, 10, 10]}
      >
        <AddPlan
          courseId={courseId}
          firstField={firstField}
          appId={appId}
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={() => router.reload()}
        />
        <Flex>
          <Select
            onChange={handleSkuStatus}
            defaultValue={router?.query?.active}
            borderRadius="full"
          >
            <option value="">Status</option>
            <option value="">Todos</option>
            <option value="true">Ativos</option>
            <option value="false">Cancelados</option>
          </Select>
        </Flex>
        <Flex>
          <Button onClick={() => onOpen()}>Criar plano</Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Header;

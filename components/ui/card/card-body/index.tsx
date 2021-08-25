import { Stack } from "@chakra-ui/react";
import React from "react";

export interface CardBodyProps {}

export const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return (
    <Stack direction="column" width="full" spacing={3}>
      {children}
    </Stack>
  );
};

import { Avatar, Flex, Stack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { colors } from "~/styles/colors";
import { CardSubtitle } from "../card-subtitle";
import { CardTitle } from "../card-title";

export interface CardHeaderProps {
  readonly title?: any;
  readonly subtitle?: string | ReactNode;
  readonly avatar?: string | ReactNode;
  readonly avatarName?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  avatar,
  avatarName,
  children,
}) => {
  return (
    <Stack direction="row" spacing="2" align="center" marginBottom={3}>
      {(avatar || avatarName) &&
        (typeof avatar === "string" || !avatar ? (
          <Avatar
            name={avatarName}
            src={avatar ? avatar + "" : ""}
            size="md"
            backgroundColor={colors.primary.main}
            color="white"
          />
        ) : (
          <Flex>{avatar}</Flex>
        ))}
      {(title || subtitle) && (
        <Stack direction="column" spacing={1} align="flex-start">
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </Stack>
      )}
    </Stack>
  );
};

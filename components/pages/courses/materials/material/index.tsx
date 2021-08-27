import { Flex, Heading, Image, Link, Stack } from "@chakra-ui/react";
import { memo } from "react";
import { MaterialModel } from "~/services/@types/material";
import { colors } from "~/styles/colors";
import { assetsIconsUrl } from "~/utils/constants";

interface Props {
  readonly material: MaterialModel;
}

export const Material: React.FC<Props> = memo(({ material }) => {
  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
    >
      <Stack direction="row" align="center" spacing={5}>
        <Image
          height="50px"
          src={`${assetsIconsUrl}/${material.format}.png`}
          fallbackSrc="/no-image.png"
          alt="ImageMaterial"
        />
        <Heading size="sm" lineHeight="shorter">
          {material.title}
        </Heading>
      </Stack>
      <Flex>
        <Link
          fontWeight="bold"
          color={colors.primary.main}
          href={material?.url}
          download
          target="_blank"
        >
          Baixar
        </Link>
      </Flex>
    </Stack>
  );
});

Material.displayName = 'Material';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text
} from "@chakra-ui/react";
import React from "react";
import { SkuModel } from "~/services/@types/sku";
import { FormUpdatePrice } from "~/components/forms/form-update-price";
import { FormUpdateSkuQuantity } from "~/components/forms/form-update-sku-quantity";
import { useSkuPrices } from "~/hooks/use-sku-prices";

interface Props {
  readonly plan: SkuModel;
  readonly appId: string;
  readonly isOpen: boolean;
  readonly onClose: () => any;
  readonly onSuccess: () => any;
  readonly firstField: any;
}

export const UpdatePlan: React.FC<Props> = ({
  isOpen,
  plan,
  appId,
  onClose,
  onSuccess,
  firstField,
  ...props
}) => {
  const { prices, loading: loadingPrices } = useSkuPrices({
    skuId: plan.id,
    appId,
  });
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Alterar assinatura</DrawerHeader>

        <DrawerBody>
          {plan?.inventory?.type && plan.inventory.type !== "infinite" && (
            <Flex flexDir="column" marginBottom="5">
              <Heading size="lg" marginBottom="2" lineHeight="shorter">
                Estoque
              </Heading>
              <FormUpdateSkuQuantity
                sku={plan}
                appId={appId}
                onSuccess={onSuccess}
              />
            </Flex>
          )}
          <Flex flexDir="column" marginBottom="5">
            <Heading size="lg" marginBottom="2" lineHeight="shorter">
              Preços
            </Heading>
            {loadingPrices && <Text fontSize="sm">Carregando...</Text>}
            {!loadingPrices &&
              prices &&
              prices.length &&
              prices.map((price) => (
                <Flex key={price.id}>
                  <FormUpdatePrice
                    price={price}
                    appId={appId}
                    onSuccess={onSuccess}
                  />
                </Flex>
              ))}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

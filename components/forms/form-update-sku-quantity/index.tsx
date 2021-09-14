import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { InputNumber } from '~/components/ui/input-number';
import { AlertsContext } from '~/contexts/alerts';
import { SkuModel } from '~/services/@types/sku';
import { SkuServiceRest } from '~/services/rest-api/services/sku/sku.service';

interface Props {
  readonly sku: SkuModel;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormUpdateSkuQuantity: React.FC<Props> = ({
  sku,
  appId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useContext(AlertsContext);

  const formik = useFormik({
    initialValues: {
      quantity: sku?.inventory?.quantity || 0
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let quantity = sku?.inventory.quantity - values.quantity;
        const skuService = new SkuServiceRest({ appId });
        let data: boolean = false;
        if (quantity < 0) {
          quantity = quantity * -1;
          data = await skuService.addQuantity(sku?.id, { quantity });
        } else {
          data = await skuService.withdrawQuantity(sku?.id, { quantity });
        }
        if (data) {
          addAlert({
            status: 'success',
            text: 'Quantidade atualizada com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao atualizar a quantidade!'
      });
      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Flex height="auto" flexDir="column">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <InputNumber
            id="quantity"
            name="quantity"
            label="Quantidade"
            placeholder="Quantidade"
            borderColor={formik.errors.quantity && 'red.400'}
            errorMessage={formik.touched.quantity && formik.errors.quantity}
            min={1}
            step={1}
            defaultValue={sku?.inventory?.quantity || 0}
            value={formik.values.quantity}
            onChange={(value) =>
              formik.setFieldValue('quantity', parseInt(value))
            }
          />

          <Flex>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Salvando"
              spinnerPlacement="end"
              disabled={formik.isSubmitting || !formik.isValid}
              marginTop={4}
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

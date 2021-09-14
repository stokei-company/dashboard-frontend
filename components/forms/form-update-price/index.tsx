import { Flex, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { InputNumber } from '~/components/ui/input-number';
import { AlertsContext } from '~/contexts/alerts';
import { PriceModel } from '~/services/@types/price';
import { PriceServiceRest } from '~/services/rest-api/services/price/price.service';
import { colors } from '~/styles/colors';
import { convertToMoney } from '~/utils/convert-to-money';

interface Props {
  readonly price: PriceModel;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormUpdatePrice: React.FC<Props> = ({
  price,
  appId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useContext(AlertsContext);

  const formik = useFormik({
    initialValues: {
      percentageOff: 0
    },
    validationSchema: Yup.object({
      percentageOff: Yup.number()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const percentageOff =
          values.percentageOff > 100
            ? 10000
            : Math.round(values.percentageOff * 100);

        const isRemove = percentageOff === 0;

        const priceService = new PriceServiceRest({ appId });
        let data: any;
        if (isRemove) {
          data = await priceService.deleteDiscount(price.id);
        } else {
          data = await priceService.addDiscount(price.id, {
            discount: {
              name: `%${(percentageOff / 100).toFixed(2)} OFF`,
              percentageOff
            }
          });
        }

        if (data) {
          addAlert({
            status: 'success',
            text: 'Preço alterado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao alterar o preço!'
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
          <Stack direction="row" alignItems="center">
            <Text fontSize="xl" fontWeight="bold" color={colors.primary.main}>
              {convertToMoney(price?.amount, price?.currency)}
            </Text>
            {price?.fromAmount && (
              <Text fontSize="sm" color="gray.800">
                <del>{convertToMoney(price?.fromAmount, price?.currency)}</del>
              </Text>
            )}
          </Stack>

          <InputNumber
            id="percentageOff"
            name="percentageOff"
            label="Desconto %"
            placeholder="Desconto"
            min={0}
            max={100}
            step={0.01}
            precision={2}
            defaultValue={
              price?.discount?.percentageOff
                ? price?.discount?.percentageOff / 100
                : 0
            }
            onChange={(value) =>
              formik.setFieldValue(
                'percentageOff',
                parseFloat(value) > 100 ? 100 : parseFloat(value)
              )
            }
            borderColor={formik.errors.percentageOff && 'red.400'}
            errorMessage={
              formik.touched.percentageOff && formik.errors.percentageOff
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

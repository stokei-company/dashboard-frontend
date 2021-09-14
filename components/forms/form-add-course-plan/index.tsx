import { Flex, Heading, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { InputNumber } from '~/components/ui/input-number';
import { Select } from '~/components/ui/select';
import { AlertsContext } from '~/contexts/alerts';
import { CourseSkuServiceRest } from '~/services/rest-api/services/course-sku/course-sku.service';
import { convertToAmount } from '~/utils/convert-to-amount';
import { convertToMoney } from '~/utils/convert-to-money';

interface Props {
  readonly courseId: string;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormAddCoursePlan: React.FC<Props> = ({
  courseId,
  appId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useContext(AlertsContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      type: 'permanent',
      price: undefined,
      recurringInterval: 1,
      recurringType: 'day',
      inventoryQuantity: 0,
      inventoryType: 'infinite'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Obrigatório'),
      type: Yup.string().required('Obrigatório'),
      code: Yup.string(),
      price: Yup.string().required('Obrigatório'),
      recurringInterval: Yup.number().min(0).required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const courseSkuService = new CourseSkuServiceRest({ courseId, appId });
        const data = await courseSkuService.create({
          name: values.name,
          code: values.code,
          type: values.type,
          prices: [
            {
              amount: convertToAmount(values.price)
            }
          ],
          recurring: {
            interval: values.recurringInterval,
            type: values.recurringType
          },
          inventory: {
            type: values.inventoryType,
            quantity: values.inventoryQuantity
          }
        });
        if (data) {
          addAlert({
            status: 'success',
            text: 'Assinatura criada com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao criar a assinatura!'
      });
      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Flex height="auto" flexDir="column" justifyContent="stretch">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Input
            id="name"
            name="name"
            label="Nome"
            placeholder="Nome"
            borderColor={formik.errors.name && 'red.400'}
            errorMessage={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps('name')}
          />

          <Input
            id="price"
            name="price"
            label="Preço R$"
            placeholder="Preço"
            borderColor={formik.errors.price && 'red.400'}
            errorMessage={
              formik.touched.price && formik.errors.price
                ? formik.errors.price + ''
                : ''
            }
            {...formik.getFieldProps('price')}
            value={convertToMoney(formik.values.price, 'BRL')}
            onChange={(event) =>
              formik.setFieldValue(
                'price',
                event.target.value.replace(/\D/g, '')
              )
            }
          />

          <Select
            id="type"
            name="type"
            label="Tipo do plano"
            placeholder="Tipo do plano"
            borderColor={formik.errors.type && 'red.400'}
            errorMessage={formik.touched.type && formik.errors.type}
            {...formik.getFieldProps('type')}
          >
            <option value="permanent">Vitalício</option>
            <option value="recurring">Recorrente</option>
          </Select>

          {formik.values.type !== 'permanent' && (
            <>
              <Heading size="sm" lineHeight="shorter" marginBottom="2">
                Tempo
              </Heading>

              <Stack direction="row" spacing={5}>
                <InputNumber
                  id="recurringInterval"
                  name="recurringInterval"
                  placeholder="Intervalo de tempo"
                  borderColor={formik.errors.recurringInterval && 'red.400'}
                  errorMessage={
                    formik.touched.recurringInterval &&
                    formik.errors.recurringInterval
                  }
                  min={1}
                  step={1}
                  defaultValue={1}
                  onChange={(value) =>
                    formik.setFieldValue('recurringInterval', value)
                  }
                />

                <Select
                  id="recurringType"
                  name="recurringType"
                  borderColor={formik.errors.recurringType && 'red.400'}
                  errorMessage={
                    formik.touched.recurringType && formik.errors.recurringType
                  }
                  {...formik.getFieldProps('recurringType')}
                >
                  <option value="day">Dias</option>
                  <option value="week">Semanas</option>
                  <option value="month">Meses</option>
                  <option value="year">Anos</option>
                </Select>
              </Stack>
            </>
          )}

          <Select
            id="inventoryType"
            name="inventoryType"
            label="Estoque"
            borderColor={formik.errors.inventoryType && 'red.400'}
            errorMessage={
              formik.touched.inventoryType && formik.errors.inventoryType
            }
            {...formik.getFieldProps('inventoryType')}
          >
            <option value="infinite">Infinito</option>
            <option value="finite">Finito</option>
          </Select>

          {formik.values.inventoryType !== 'infinite' && (
            <InputNumber
              id="inventoryQuantity"
              name="inventoryQuantity"
              label="Quantidade"
              placeholder="Quantidade"
              borderColor={formik.errors.inventoryQuantity && 'red.400'}
              errorMessage={
                formik.touched.inventoryQuantity &&
                formik.errors.inventoryQuantity
              }
              min={0}
              step={1}
              defaultValue={0}
              onChange={(value) =>
                formik.setFieldValue('inventoryQuantity', value)
              }
            />
          )}

          <Flex>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Criando"
              spinnerPlacement="end"
              disabled={formik.isSubmitting || !formik.isValid}
              marginTop={4}
            >
              Criar
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

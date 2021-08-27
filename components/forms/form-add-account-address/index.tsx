import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { InputSearch } from '~/components/ui/input-search';
import { InputSwitch } from '~/components/ui/input-switch';
import { AlertsContext } from '~/contexts/alerts';
import { AddressModel } from '~/services/@types/address';
import { AddressServiceRest } from '~/services/rest-api/services/address/address.service';
import { formatCep } from '~/utils/format-cep';

interface Props {
  readonly onSuccess: (data: AddressModel) => any;
}

export const FormAddAccountAddress: React.FC<Props> = ({
  onSuccess,
  ...props
}) => {
  const { addAlert } = useContext(AlertsContext);
  const formik = useFormik({
    initialValues: {
      default: false,
      cep: ''
    },
    validationSchema: Yup.object({
      cep: Yup.string().required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const addressService = new AddressServiceRest({});
        const response = await addressService.create({
          cep: values.cep
        });
        if (response) {
          addAlert({
            status: 'success',
            text: 'Adicionado com sucesso!'
          });
          setSubmitting(false);
          onSuccess(response);
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao adicionar!'
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
          <InputSwitch
            id="default"
            name="default"
            label="Endereço padrão?"
            borderColor={formik.errors.default && 'red.400'}
            errorMessage={formik.touched.default && formik.errors.default}
            {...formik.getFieldProps('default')}
          />

          <Input
            id="cep"
            name="cep"
            label="Cep"
            placeholder="00000-000"
            borderColor={formik.errors.cep && 'red.400'}
            errorMessage={formik.touched.cep && formik.errors.cep}
            {...formik.getFieldProps('cep')}
            onChange={(event) =>
              formik.setFieldValue('cep', formatCep(event.target.value))
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

import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { AlertsContext } from '~/contexts/alerts';
import { MeModel } from '~/services/@types/me';
import { MeServiceRest } from '~/services/rest-api/services/me/me.service';
import { formatCpf } from '~/utils/format-cpf';
import { formatBirthdayDateISO } from '~/utils/format-date';
import { formatPhone } from '~/utils/format-phone';

interface Props {
  readonly user: MeModel;
  readonly onSuccess: () => any;
}

export const FormUpdateAccountInfo: React.FC<Props> = ({
  onSuccess,
  user,
  ...props
}) => {
  const { addAlert } = useContext(AlertsContext);
  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      cpf: user?.cpf ? formatCpf(user?.cpf) : '',
      country: user?.country,
      phone: user?.phone ? formatPhone(user?.phone) : '',
      dateBirthday: formatBirthdayDateISO(user?.dateBirthday)
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Obrigatório'),
      lastname: Yup.string().required('Obrigatório'),
      cpf: Yup.string().required('Obrigatório'),
      country: Yup.string().required('Obrigatório'),
      phone: Yup.string().required('Obrigatório'),
      dateBirthday: Yup.date().required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const meService = new MeServiceRest({});
        const response = await meService.update({
          firstname: values.firstname,
          lastname: values.lastname,
          cpf: values.cpf,
          country: values.country,
          phone: values.phone,
          dateBirthday: values.dateBirthday
        });
        if (response) {
          addAlert({
            status: 'success',
            text: 'Atualizado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao atualizar os dados!'
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
          <Input
            id="firstname"
            name="firstname"
            label="Nome"
            placeholder="Nome"
            borderColor={formik.errors.firstname && 'red.400'}
            errorMessage={formik.touched.firstname && formik.errors.firstname}
            {...formik.getFieldProps('firstname')}
          />

          <Input
            id="lastname"
            name="lastname"
            label="Sobrenome"
            placeholder="Sobrenome"
            borderColor={formik.errors.lastname && 'red.400'}
            errorMessage={formik.touched.lastname && formik.errors.lastname}
            {...formik.getFieldProps('lastname')}
          />

          <Input
            id="dateBirthday"
            name="dateBirthday"
            label="Data de nascimento"
            type="date"
            borderColor={formik.errors.dateBirthday && 'red.400'}
            errorMessage={
              formik.touched.dateBirthday && formik.errors.dateBirthday
            }
            {...formik.getFieldProps('dateBirthday')}
          />

          <Input
            id="cpf"
            name="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            borderColor={formik.errors.cpf && 'red.400'}
            errorMessage={formik.touched.cpf && formik.errors.cpf}
            {...formik.getFieldProps('cpf')}
            onChange={(event) => {
              if (event.target.value.length <= 14) {
                formik.setFieldValue('cpf', formatCpf(event.target.value));
              }
            }}
          />

          <Input
            id="country"
            name="country"
            label="País"
            placeholder="País"
            borderColor={formik.errors.country && 'red.400'}
            errorMessage={formik.touched.country && formik.errors.country}
            {...formik.getFieldProps('country')}
          />

          <Input
            id="phone"
            name="phone"
            label="Telefone"
            placeholder="(99) 99999-9999"
            borderColor={formik.errors.phone && 'red.400'}
            errorMessage={formik.touched.phone && formik.errors.phone}
            {...formik.getFieldProps('phone')}
            onChange={(event) =>
              formik.setFieldValue('phone', formatPhone(event.target.value))
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

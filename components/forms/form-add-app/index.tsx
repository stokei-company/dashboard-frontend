import { Flex, Stack, Icon, Heading, Text } from '@chakra-ui/react';
import { Steps } from 'antd';
import { useFormik } from 'formik';
import React, { useCallback, useContext } from 'react';
import * as Yup from 'yup';
import {
  BankAccountIcon,
  ContactIcon,
  EmailIcon,
  InfoIcon,
  SmileIcon
} from '~/components/icons';
import { Button, ButtonOutlined } from '~/components/ui/button';
import {
  Input,
  InputEmail,
  InputPhone,
  InputPhoneOnChangeData
} from '~/components/ui/input';
import Select from '~/components/ui/select';
import { AlertsContext } from '~/contexts/alerts';
import { clientRestApi } from '~/services/rest-api';
import { formatAppNickname } from '~/utils/format-app-nickname';
import { formatCnpj } from '~/utils/format-cnpj';
import { formatCpf } from '~/utils/format-cpf';

interface HeaderProps {
  readonly title: string;
  readonly description?: string;
}
export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  ...props
}) => {
  return (
    <Flex as="header" width="full" flexDirection="column" marginBottom={3}>
      {title && (
        <Heading size="lg" marginBottom={1}>
          {title}
        </Heading>
      )}
      {description && (
        <Text lineHeight="shorter" color="gray.500">
          {description}
        </Text>
      )}
    </Flex>
  );
};

interface FormAddAppProps {
  readonly onSuccess: () => any;
}

export const FormAddApp: React.FC<FormAddAppProps> = ({
  onSuccess,
  ...props
}) => {
  const [current, setCurrent] = React.useState(0);
  const { addAlert } = useContext(AlertsContext);

  const handleNext = useCallback(() => {
    setCurrent((curr) => curr + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrent((curr) => curr - 1);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      nickname: '',
      email: '',
      country: 'br',
      documentType: 'cpf',
      documentNumber: '',
      phoneAreaCode: '',
      phoneCountryAreaCode: '',
      phoneNumber: '',
      bankAccountCheckDigit: '',
      bankAccountNumber: '',
      bankAccountType: 'conta_corrente',
      bankBankCode: '',
      bankBranchCheckDigit: '',
      bankBranchNumber: '',
      bankHolderDocument: '',
      bankHolderName: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Obrigatório'),
      nickname: Yup.string().required('Obrigatório'),
      email: Yup.string().email('Formato inválido').required('Obrigatório'),
      bankAccountCheckDigit: Yup.string(),
      bankAccountNumber: Yup.string().required('Obrigatório'),
      bankAccountType: Yup.string().required('Obrigatório'),
      bankBankCode: Yup.string().required('Obrigatório'),
      bankBranchCheckDigit: Yup.string(),
      bankBranchNumber: Yup.string().required('Obrigatório'),
      bankHolderDocument: Yup.string().required('Obrigatório'),
      bankHolderName: Yup.string().required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const appService = clientRestApi().apps();
        const data = await appService.create({
          name: values.name,
          nickname: (values.nickname || '').toLowerCase(),
          email: values.email,
          country: (values.country || '').toLowerCase(),
          document: {
            type: values.documentType,
            value: values.documentNumber
          },
          bankAccount: {
            accountCheckDigit: values.bankAccountCheckDigit,
            accountNumber: values.bankAccountNumber,
            accountType: values.bankAccountType as any,
            bankCode: values.bankBankCode,
            branchCheckDigit: values.bankBranchCheckDigit,
            branchNumber: values.bankBranchNumber,
            holderDocument: values.bankHolderDocument,
            holderName: values.bankHolderName
          },
          phone: {
            areaCode: values.phoneAreaCode,
            countryAreaCode: values.phoneCountryAreaCode,
            number: values.phoneNumber
          }
        });
        if (data) {
          addAlert({
            status: 'success',
            text: 'Aplicação criada com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao sua aplicação, verifique os seus dados!'
      });
      setSubmitting(false);
    }
  });

  const handleChangePhone = (data: InputPhoneOnChangeData) => {
    formik.setFieldValue('phoneNumber', data?.phoneObj?.number);
    formik.setFieldValue('phoneAreaCode', data?.phoneObj?.areaCode);
    formik.setFieldValue(
      'phoneCountryAreaCode',
      data?.phoneObj?.countryAreaCode
    );
  };

  const steps = [
    {
      title: 'Informações',
      icon: InfoIcon,
      content: (
        <Stack direction="column" spacing={5}>
          <Input
            name="name"
            label="Nome"
            placeholder="Meu App"
            borderColor={formik.touched.name && formik.errors.name && 'red.400'}
            errorMessage={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps('name')}
          />

          <Input
            name="nickname"
            label="Nome de usuário"
            placeholder="meuapp"
            borderColor={
              formik.touched.nickname && formik.errors.nickname && 'red.400'
            }
            errorMessage={formik.touched.nickname && formik.errors.nickname}
            {...formik.getFieldProps('nickname')}
            onChange={(e) =>
              formik.setFieldValue(
                'nickname',
                formatAppNickname(e.target.value)
              )
            }
          />

          <Select
            name="country"
            label="País"
            borderColor={
              formik.touched.country && formik.errors.country && 'red.400'
            }
            errorMessage={formik.touched.country && formik.errors.country}
            {...formik.getFieldProps('country')}
          >
            <option value="br">Brasil</option>
          </Select>

          <Stack direction={['column', 'column', 'row', 'row']} spacing={5}>
            <Select
              width="150px"
              name="documentType"
              label="Documento"
              borderColor={
                formik.touched.documentType &&
                formik.errors.documentType &&
                'red.400'
              }
              errorMessage={
                formik.touched.documentType && formik.errors.documentType
              }
              {...formik.getFieldProps('documentType')}
            >
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
            </Select>

            <Input
              name="documentNumber"
              label="Número do documento"
              placeholder={
                formik.values.documentType === 'cnpj'
                  ? '00.000.000/0000-00'
                  : '000.000.000-00'
              }
              borderColor={
                formik.touched.documentNumber &&
                formik.errors.documentNumber &&
                'red.400'
              }
              errorMessage={
                formik.touched.documentNumber && formik.errors.documentNumber
              }
              {...formik.getFieldProps('documentNumber')}
              onChange={(e) =>
                formik.setFieldValue(
                  'documentNumber',
                  formik.values.documentType === 'cnpj'
                    ? formatCnpj(e.target.value)
                    : formatCpf(e.target.value)
                )
              }
            />
          </Stack>
        </Stack>
      )
    },
    {
      title: 'Conta',
      icon: BankAccountIcon,
      content: (
        <Stack direction="column" spacing={5}>
          <Header
            title="Sua conta"
            description="Por favor, diga a conta que você receberá os valores vendidos."
          />
          <Stack direction={['column', 'column', 'row', 'row']} spacing={5}>
            <Input
              name="bankAccountNumber"
              label="Número da conta"
              placeholder="0000000"
              maxLength={13}
              borderColor={
                formik.touched.bankAccountNumber &&
                formik.errors.bankAccountNumber &&
                'red.400'
              }
              errorMessage={
                formik.touched.bankAccountNumber &&
                formik.errors.bankAccountNumber
              }
              {...formik.getFieldProps('bankAccountNumber')}
            />
            <Input
              name="bankAccountCheckDigit"
              label="Digíto verificador da conta"
              placeholder="00"
              maxLength={2}
              borderColor={
                formik.touched.bankAccountCheckDigit &&
                formik.errors.bankAccountCheckDigit &&
                'red.400'
              }
              errorMessage={
                formik.touched.bankAccountCheckDigit &&
                formik.errors.bankAccountCheckDigit
              }
              {...formik.getFieldProps('bankAccountCheckDigit')}
            />
          </Stack>
          <Select
            name="bankAccountType"
            label="Tipo da conta"
            borderColor={
              formik.touched.bankAccountType &&
              formik.errors.bankAccountType &&
              'red.400'
            }
            errorMessage={
              formik.touched.bankAccountType && formik.errors.bankAccountType
            }
            {...formik.getFieldProps('bankAccountType')}
          >
            <option value="conta_corrente">Conta corrente</option>
            <option value="conta_poupanca">Conta poupança</option>
            <option value="conta_corrente_conjunta">
              Conta corrente conjunta
            </option>
            <option value="conta_poupanca_conjunta">
              Conta poupança conjunta
            </option>
          </Select>
          <Input
            name="bankBankCode"
            label="Codigo do banco"
            placeholder="000"
            maxLength={3}
            borderColor={
              formik.touched.bankBankCode &&
              formik.errors.bankBankCode &&
              'red.400'
            }
            errorMessage={
              formik.touched.bankBankCode && formik.errors.bankBankCode
            }
            {...formik.getFieldProps('bankBankCode')}
          />
          <Stack direction={['column', 'column', 'row', 'row']} spacing={5}>
            <Input
              name="bankBranchNumber"
              label="Número da agência"
              placeholder="0000"
              maxLength={4}
              borderColor={
                formik.touched.bankBranchNumber &&
                formik.errors.bankBranchNumber &&
                'red.400'
              }
              errorMessage={
                formik.touched.bankBranchNumber &&
                formik.errors.bankBranchNumber
              }
              {...formik.getFieldProps('bankBranchNumber')}
            />
            <Input
              required={false}
              name="branchCheckDigit"
              label="Digito verificador da agência"
              placeholder="0"
              maxLength={1}
              borderColor={
                formik.touched.bankBranchCheckDigit &&
                formik.errors.bankBranchCheckDigit &&
                'red.400'
              }
              errorMessage={
                formik.touched.bankBranchCheckDigit &&
                formik.errors.bankBranchCheckDigit
              }
              {...formik.getFieldProps('bankBranchCheckDigit')}
            />
          </Stack>
          <Input
            name="bankHolderDocument"
            label="CPF/CNPJ"
            placeholder="000.000.000-00"
            borderColor={
              formik.touched.bankHolderDocument &&
              formik.errors.bankHolderDocument &&
              'red.400'
            }
            errorMessage={
              formik.touched.bankHolderDocument &&
              formik.errors.bankHolderDocument
            }
            helperMessage="Documento identificador do titular da conta"
            {...formik.getFieldProps('bankHolderDocument')}
            onChange={(e) =>
              formik.setFieldValue(
                'bankHolderDocument',
                e.target.value?.length >= 14
                  ? formatCnpj(e.target.value)
                  : formatCpf(e.target.value)
              )
            }
          />
          <Input
            name="bankHolderName"
            label="Nome completo/Nome fantasia"
            placeholder="Nome completo ou nome fantasia"
            helperMessage="Nome completo (se pessoa física) ou razão social (se pessoa jurídica)."
            maxLength={30}
            borderColor={
              formik.touched.bankHolderName &&
              formik.errors.bankHolderName &&
              'red.400'
            }
            errorMessage={
              formik.touched.bankHolderName && formik.errors.bankHolderName
            }
            {...formik.getFieldProps('bankHolderName')}
          />
        </Stack>
      )
    },
    {
      title: 'Contato',
      icon: ContactIcon,
      content: (
        <Stack direction="column" spacing={5}>
          <InputPhone
            label="Telefone de contato"
            borderColor={
              formik.touched.email && formik.errors.email && 'red.400'
            }
            errorMessage={formik.touched.email && formik.errors.email}
            onChange={(data) => handleChangePhone(data)}
          />
          <InputEmail
            name="email"
            label="E-mail de contato"
            placeholder="meuapp@email.com"
            borderColor={
              formik.touched.email && formik.errors.email && 'red.400'
            }
            errorMessage={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />
        </Stack>
      )
    }
  ];

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
          <Flex marginTop={5}>
            <Steps current={current} responsive={true} type="navigation">
              {steps.map((item) => (
                <Steps.Step
                  key={item.title}
                  title={item.title}
                  icon={
                    <Flex
                      width="full"
                      height="full"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={item.icon} />
                    </Flex>
                  }
                />
              ))}
            </Steps>
          </Flex>
          <Stack direction="column" spacing={5} marginTop={10}>
            {steps[current].content}

            <Stack direction="row" spacing={5}>
              {current > 0 && (
                <ButtonOutlined
                  style={{ margin: '0 8px' }}
                  onClick={() => handlePrev()}
                >
                  Anterior
                </ButtonOutlined>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="submit"
                  isLoading={formik.isSubmitting}
                  loadingText="Criando"
                  spinnerPlacement="end"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  Criar
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button onClick={() => handleNext()}>Próximo</Button>
              )}
            </Stack>
          </Stack>
        </form>
      </Flex>
    </Flex>
  );
};

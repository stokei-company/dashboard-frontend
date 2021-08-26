import { Flex, Icon, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useCallback, useContext } from 'react';
import * as Yup from 'yup';
import { UserIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { InputSearch } from '~/components/ui/input-search';
import { Select } from '~/components/ui/select';
import { UserAvatar } from '~/components/ui/user-avatar';
import { AlertsContext } from '~/contexts/alerts';
import { AuthContext } from '~/contexts/auth';
import { CourseContext } from '~/contexts/course';
import { UserModel } from '~/services/@types/user';
import { CourseUserServiceRest } from '~/services/rest-api/services/course-user/course-user.service';
import { UserServiceRest } from '~/services/rest-api/services/user/user.service';

interface Props {
  readonly onSuccess: () => any;
}

export const FormAddCourseUser: React.FC<Props> = ({ onSuccess, ...props }) => {
  const { addAlert } = useContext(AlertsContext);
  const { app, course } = useContext(CourseContext);
  const { user } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: { interval: 0, userId: '', type: 'day' },
    validationSchema: Yup.object({
      interval: Yup.number().required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const courseUserService = new CourseUserServiceRest({
          courseId: course?.id,
          appId: app?.id
        });
        const data = await courseUserService.create({
          userId: values.userId,
          recurring: {
            interval: values.interval,
            type: values.type
          }
        });
        if (data) {
          addAlert({
            status: 'success',
            text: 'Usuário adicionado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao adicionar o usuário!'
      });
      setSubmitting(false);
    }
  });

  const findAllUsers = useCallback(
    async (text: string) => {
      if (!text) {
        return [];
      }
      const userService = new UserServiceRest({ appId: app?.id });
      const response = await userService.findAll({ fullname: text, limit: 25 });
      const items = response?.items;
      if (!items?.length) {
        return [];
      }
      return response.items.filter((item) => item?.id !== user?.id);
    },
    [app, user]
  );

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
          <InputSearch
            id="userId"
            name="userId"
            label="Aluno"
            placeholder="Nome do aluno"
            rightElement={<Icon as={UserIcon} fontSize="sm" color="gray.400" />}
            onSearch={findAllUsers}
            noItems={'Nenhum item.'}
            onItemClick={(user: UserModel) =>
              formik.setFieldValue('userId', user?.id)
            }
            item={(user: UserModel, index) => (
              <Card
                width="full"
                avatar={
                  <UserAvatar
                    src={user?.avatar}
                    name={user?.fullname}
                    size="sm"
                  />
                }
                title={user?.fullname}
                paddingY={2}
                paddingX={0}
                borderRadius="none"
                boxShadow="none"
              />
            )}
          />

          <Input
            id="interval"
            name="interval"
            type="number"
            label="Intervalo de tempo"
            placeholder="Intervalo de tempo"
            borderColor={formik.errors.interval && 'red.400'}
            errorMessage={formik.touched.interval && formik.errors.interval}
            {...formik.getFieldProps('interval')}
          />

          <Select
            id="type"
            name="type"
            label="Tipo do intervalo"
            placeholder="Tipo do intervalo"
            borderColor={formik.errors.type && 'red.400'}
            errorMessage={formik.touched.type && formik.errors.type}
            {...formik.getFieldProps('type')}
          >
            <option value="day">Dias</option>
            <option value="week">Semanas</option>
            <option value="month">Meses</option>
            <option value="year">Anos</option>
          </Select>

          {formik.status && (
            <Text color={formik.status.ok ? 'green.500' : 'red.500'}>
              {formik.status.text}
            </Text>
          )}

          <Flex>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Salvando"
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

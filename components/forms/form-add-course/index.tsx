import { Flex, Icon, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { UserIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { InputFileImage } from '~/components/ui/input-file-image';
import { InputSearch } from '~/components/ui/input-search';
import { Select } from '~/components/ui/select';
import { TextEditor } from '~/components/ui/text-editor';
import { UserAvatar } from '~/components/ui/user-avatar';
import { AlertsContext } from '~/contexts/alerts';
import { AuthContext } from '~/contexts/auth';
import { useCategories } from '~/hooks/use-categories';
import { UserModel } from '~/services/@types/user';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { UserServiceRest } from '~/services/rest-api/services/user/user.service';
import { ASPECT_RATIO_COURSES } from '~/utils/constants';
import { Teacher, TeacherData } from './teacher';

interface Props {
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormAddCourse: React.FC<Props> = ({
  appId,
  onSuccess,
  ...props
}) => {
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const { addAlert } = useContext(AlertsContext);
  const { user } = useContext(AuthContext);
  const { categories } = useCategories();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categoryId: '',
      image: null,
      teachers: []
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Obrigatório'),
      categoryId: Yup.string().required('Obrigatório'),
      description: Yup.string()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('categoryId', values.categoryId);
        formData.append('teachers', JSON.stringify(values.teachers));
        formData.append('image', values.image);

        const courseService = new CourseServiceRest({ appId });
        const data = await courseService.create(formData);
        if (data) {
          addAlert({
            status: 'success',
            text: 'Curso criado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao criar o curso!'
      });
      setSubmitting(false);
    }
  });

  const setTeachersFormik = (userId: string) => {
    formik.setFieldValue('teachers', [userId]);
  };

  useEffect(() => {
    if (user) {
      setTeachers((list) => [
        {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          fullname: user.fullname,
          avatar: user.avatar
        }
      ]);
      setTeachersFormik(user?.id);
    }
  }, [user]);

  const removeTeacher = useCallback((index: number) => {
    setTeachers((list) => list.filter((_, i) => i !== index));
  }, []);

  const addTeacher = (teacher: UserModel) => {
    const existsLogic = (user: UserModel) => user.id === teacher.id;

    setTeachers((list) => {
      const exists = list.find(existsLogic);
      if (exists) {
        return list;
      }
      return [
        ...list,
        {
          id: teacher.id,
          firstname: teacher.firstname,
          lastname: teacher.lastname,
          fullname: teacher.fullname,
          avatar: teacher.avatar
        }
      ];
    });

    const exists = formik.values?.teachers?.find(existsLogic);
    if (!exists) {
      formik.setFieldValue('teachers', [
        ...formik.values?.teachers,
        teacher?.id
      ]);
    }
  };

  const findAllUsers = useCallback(async (text: string) => {
    if (!text) {
      return [];
    }
    const userService = new UserServiceRest({});
    const response = await userService.findAll({ fullname: text, limit: 25 });
    if (!response?.items?.length) {
      return [];
    }
    return response?.items;
  }, []);

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
          <Stack direction="column" spacing={5}>
            <Flex width={['full', 'full', '200px', '200px']}>
              <InputFileImage
                id="image"
                label="Imagens"
                aspectRatio={ASPECT_RATIO_COURSES}
                errorMessage={
                  formik.touched.image && formik.errors.image
                    ? 'Imagem inválida!'
                    : null
                }
                onChange={(event) => {
                  formik.setFieldValue('image', event.target.files[0] || '');
                }}
              />
            </Flex>

            <Input
              id="name"
              name="name"
              label="Nome"
              placeholder="Nome"
              borderColor={formik.errors.name && 'red.400'}
              errorMessage={formik.touched.name && formik.errors.name}
              {...formik.getFieldProps('name')}
            />

            <TextEditor
              id="description"
              name="description"
              label="Descrição"
              errorMessage={
                formik.touched.description && formik.errors.description
              }
              {...formik.getFieldProps('description')}
              onChange={(value) => formik.setFieldValue('description', value)}
            />

            <InputSearch
              hideCurrentItem
              id="teachers"
              name="teachers"
              label="Professores"
              placeholder="Nome do professor"
              rightElement={
                <Icon as={UserIcon} fontSize="sm" color="gray.400" />
              }
              onSearch={findAllUsers}
              noItems={'Nenhum item.'}
              onItemClick={(user: UserModel) => addTeacher(user)}
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
                  paddingX={0}
                  paddingY={2}
                  borderRadius="none"
                  boxShadow="none"
                />
              )}
            />

            {teachers?.length > 0 && (
              <Stack direction="column" spacing={3}>
                {teachers.map((teacher, index) => (
                  <Teacher
                    key={teacher.id}
                    itsMe={teacher.id === user?.id}
                    teacher={teacher}
                    onRemove={() => removeTeacher(index)}
                  />
                ))}
              </Stack>
            )}
            <Select
              id="categoryId"
              name="categoryId"
              label="Categoria"
              borderColor={formik.errors.categoryId && 'red.400'}
              errorMessage={
                formik.touched.categoryId && formik.errors.categoryId
              }
              {...formik.getFieldProps('categoryId')}
            >
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </Select>

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
          </Stack>
        </form>
      </Flex>
    </Flex>
  );
};

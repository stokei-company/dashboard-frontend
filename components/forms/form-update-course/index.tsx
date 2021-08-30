import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { InputFileImage } from '~/components/ui/input-file-image';
import { TextEditor } from '~/components/ui/text-editor';
import { AlertsContext } from '~/contexts/alerts';
import { CourseContext } from '~/contexts/course';
import { CourseModel } from '~/services/@types/course';
import { CourseServiceRest } from '~/services/rest-api/services/course/course.service';
import { ASPECT_RATIO_COURSES } from '~/utils/constants';

interface Props {
  readonly course: CourseModel;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormUpdateCourse: React.FC<Props> = ({
  course,
  appId,
  onSuccess,
  ...props
}) => {
  const { setCourseImageUrl } = useContext(CourseContext);
  const { addAlert } = useContext(AlertsContext);

  const formik = useFormik({
    initialValues: {
      name: course?.name,
      description: course?.description,
      image: null
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      description: Yup.string()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        if (values.name) {
          formData.append('name', values.name);
        }
        if (values.description) {
          formData.append('description', values.description);
        }
        if (values.image) {
          formData.append('image', values.image);
        }
        const courseService = new CourseServiceRest({ appId });
        const data = await courseService.update(course?.id, formData);
        if (data) {
          addAlert({
            status: 'success',
            text: 'Curso atualizado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao atualizar o curso!'
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
          <Flex width={['full', 'full', '200px', '200px']}>
            <InputFileImage
              id="image"
              label="Imagem"
              onPreview={setCourseImageUrl}
              aspectRatio={ASPECT_RATIO_COURSES}
              errorMessage={
                formik.touched.image && formik.errors.image
                  ? 'Imagem inválida!'
                  : null
              }
              onChange={(event) =>
                formik.setFieldValue('image', event.target.files[0] || '')
              }
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
            initialValue={course?.description}
            onChange={(value) => formik.setFieldValue('description', value)}
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

import { Flex, Heading } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { InputFileImage } from '~/components/ui/input-file-image';
import { InputFileVideo } from '~/components/ui/input-file-video';
import { TextEditor } from '~/components/ui/text-editor';
import { AlertsContext } from '~/contexts/alerts';
import { CourseVideoServiceRest } from '~/services/rest-api/services/course-video/course-video.service';

interface Props {
  readonly appId: string;
  readonly moduleId: string;
  readonly onSuccess: () => any;
}

export const FormAddVideo: React.FC<Props> = ({
  appId,
  moduleId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useContext(AlertsContext);

  const [percentLoading, setPercentLoading] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      video: null,
      thumbnail: null,
      videoUrl: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Obrigatório'),
      description: Yup.string().required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('video', values.video);
        formData.append('thumbnail', values.thumbnail);
        formData.append('videoUrl', values.videoUrl);

        const courseVideoService = new CourseVideoServiceRest({
          moduleId,
          appId,
          onUploadProgress: (percent) => setPercentLoading(percent)
        });
        const data = await courseVideoService.create(formData);
        if (data) {
          addAlert({
            status: 'success',
            text: 'Video adicionado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao adicionar este video!'
      });
      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Heading size="lg" lineHeight="shorter" marginBottom={2}>
        Adicionar video
      </Heading>
      <Flex height="auto" flexDir="column" justifyContent="stretch">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <InputFileVideo
            id="video"
            label="Video"
            errorMessage={
              formik.touched.video && formik.errors.video
                ? 'Video inválido!'
                : null
            }
            onChange={(video) => formik.setFieldValue('video', video || '')}
          />

          <InputFileImage
            id="thumbnail"
            label="Miniatura"
            aspectRatio={1920 / 1080}
            errorMessage={
              formik.touched.thumbnail && formik.errors.thumbnail
                ? 'Miniatura inválida!'
                : null
            }
            onChange={(event) =>
              formik.setFieldValue('thumbnail', event.target.files[0] || '')
            }
          />

          <Input
            id="title"
            name="title"
            label="Nome"
            placeholder="Nome"
            borderColor={formik.errors.title && 'red.400'}
            errorMessage={formik.touched.title && formik.errors.title}
            {...formik.getFieldProps('title')}
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

          <Flex>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText={`${percentLoading}% Salvando`}
              spinner={null}
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

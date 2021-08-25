import { Flex, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { InputFileImage } from "~/components/ui/input-file-image";
import { TextEditor } from "~/components/ui/text-editor";
import { AlertsContext } from "~/contexts/alerts";
import { VideoModel } from "~/services/@types/video";
import { CourseVideoServiceRest } from "~/services/rest-api/services/course-video/course-video.service";

interface Props {
  readonly video: VideoModel;
  readonly appId: string;
  readonly moduleId: string;
  readonly onSuccess: () => any;
}

export const FormUpdateVideo: React.FC<Props> = ({
  video,
  appId,
  moduleId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useContext(AlertsContext);

  const [percentLoading, setPercentLoading] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: video.title,
      description: video.description,
      thumbnail: null,
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      description: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        if (values.title) {
          formData.append("title", values.title);
        }
        if (values.description) {
          formData.append("description", values.description);
        }
        if (values.thumbnail) {
          formData.append("thumbnail", values.thumbnail);
        }

        const courseVideoService = new CourseVideoServiceRest({
          moduleId,
          appId,
          onUploadProgress: setPercentLoading,
        });
        const data = await courseVideoService.update(video.id, formData);
        if (data) {
          addAlert({
            status: "success",
            text: "Video atualizado com sucesso!",
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: "error",
        text: "Erro ao atualizar este video!",
      });

      setSubmitting(false);
    },
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Heading size="lg" lineHeight="shorter" mb={4}>
        Alterar video
      </Heading>
      <Flex height="auto" flexDir="column" justifyContent="stretch">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputFileImage
            id="thumbnail"
            label="Miniatura"
            aspectRatio={1920 / 1080}
            errorMessage={
              formik.touched.thumbnail && formik.errors.thumbnail
                ? "Miniatura inválida!"
                : null
            }
            onChange={(event) =>
              formik.setFieldValue("thumbnail", event.target.files[0] || "")
            }
          />

          <Input
            id="title"
            name="title"
            label="Nome"
            placeholder="Nome"
            borderColor={formik.errors.title && "red.400"}
            errorMessage={formik.touched.title && formik.errors.title}
            {...formik.getFieldProps("title")}
          />

          <TextEditor
            id="description"
            name="description"
            label="Descrição"
            initialValue={video?.description}
            errorMessage={
              formik.touched.description && formik.errors.description
            }
            {...formik.getFieldProps("description")}
            onChange={(value) => formik.setFieldValue("description", value)}
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

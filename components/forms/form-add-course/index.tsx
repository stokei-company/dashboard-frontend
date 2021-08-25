import { Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { InputFileImage } from "~/components/ui/input-file-image";
import { Select } from "~/components/ui/select";
import { TextEditor } from "~/components/ui/text-editor";
import { Textarea } from "~/components/ui/textarea";
import { AlertsContext } from "~/contexts/alerts";
import { useCategories } from "~/hooks/use-categories";
import { CourseServiceRest } from "~/services/rest-api/services/course/course.service";

interface Props {
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormAddCourse: React.FC<Props> = ({
  appId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useContext(AlertsContext);
  const { categories } = useCategories();

  const formik = useFormik({
    initialValues: { name: "", description: "", categoryId: "", image: null },
    validationSchema: Yup.object({
      name: Yup.string().required("Obrigatório"),
      categoryId: Yup.string().required("Obrigatório"),
      description: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("categoryId", values.categoryId);
        formData.append("image", values.image);

        const courseService = new CourseServiceRest({ appId });
        const data = await courseService.create(formData);
        if (data) {
          addAlert({
            status: "success",
            text: "Curso criado com sucesso!",
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: "error",
        text: "Curso criado com sucesso!",
      });
      setSubmitting(false);
    },
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Flex height="auto" flexDir="column">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputFileImage
            id="image"
            label="Imagem"
            errorMessage={
              formik.touched.image && formik.errors.image
                ? "Imagem inválida!"
                : null
            }
            onChange={(event) =>
              formik.setFieldValue("image", event.target.files[0] || "")
            }
          />

          <Input
            id="name"
            name="name"
            label="Nome"
            placeholder="Nome"
            borderColor={formik.errors.name && "red.400"}
            errorMessage={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps("name")}
          />

          <TextEditor
            id="description"
            name="description"
            label="Descrição"
            errorMessage={
              formik.touched.description && formik.errors.description
            }
            {...formik.getFieldProps("description")}
            onChange={(value) => formik.setFieldValue("description", value)}
          />

          <Select
            id="categoryId"
            name="categoryId"
            label="Categoria"
            borderColor={formik.errors.categoryId && "red.400"}
            errorMessage={formik.touched.categoryId && formik.errors.categoryId}
            {...formik.getFieldProps("categoryId")}
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
        </form>
      </Flex>
    </Flex>
  );
};

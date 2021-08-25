import { Struct as BoxStruct } from "../../../layouts/struct";

interface Props {
  readonly appId: string;
  readonly courseId: string;
}

export const Struct: React.FC<Props> = ({ appId, courseId, children }) => {
  const baseUrl = appId && courseId ? `/apps/${appId}/courses/${courseId}` : "";

  return (
    <BoxStruct
      courseId={courseId}
      options={[
        {
          href: baseUrl,
          title: "Informações",
        },
        {
          href: baseUrl + "/users",
          title: "Alunos",
        },
        {
          href: baseUrl + "/materials",
          title: "Materiais",
        },
        {
          href: baseUrl + "/modules",
          title: "Videos",
        },
        {
          href: baseUrl + "/plans",
          title: "Planos",
        },
        {
          href: baseUrl + "/settings",
          title: "Configurações",
        },
      ]}
    >
      {children}
    </BoxStruct>
  );
};

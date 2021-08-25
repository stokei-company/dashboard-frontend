import React from "react";
import {
  Layout as LayoutDefault,
  LayoutProps,
} from "~/components/layouts/layout";
import { CourseContext, CourseContextProvider } from "~/contexts/course";
import Header from "../header";

interface Props extends LayoutProps {}

export const Layout: React.FC<Props> = ({
  children,
  menuOptions,
  ...props
}) => {
  return (
    <CourseContextProvider>
      <CourseContext.Consumer>
        {({ baseUrl }) => (
          <LayoutDefault
            {...props}
            menuOptions={[
              {
                href: baseUrl,
                title: "Painel",
              },
              {
                href: baseUrl + "/about",
                title: "Sobre",
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
            <Header />
            <main>{children}</main>
          </LayoutDefault>
        )}
      </CourseContext.Consumer>
    </CourseContextProvider>
  );
};

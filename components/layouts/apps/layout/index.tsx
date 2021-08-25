import React from "react";
import {
  Layout as LayoutDefault,
  LayoutProps,
} from "~/components/layouts/layout";
import AppContextProvider, { AppContext } from "~/contexts/app";
import Header from "../header";

interface Props extends LayoutProps {}

export const Layout: React.FC<Props> = ({
  children,
  menuOptions,
  ...props
}) => {
  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {({ baseUrl }) => (
          <LayoutDefault
            {...props}
            menuOptions={[
              {
                href: baseUrl,
                title: "Painel",
              },
              {
                href: baseUrl + "/courses",
                title: "Cursos",
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
      </AppContext.Consumer>
    </AppContextProvider>
  );
};

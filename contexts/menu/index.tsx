import { createContext, ReactNode } from 'react';

export interface MenuSubitemData {
  readonly title: string;
  readonly href: string;
  readonly icon?: ReactNode;
}

export interface MenuItemData {
  readonly title: string;
  readonly href?: string;
  readonly icon?: ReactNode;
  readonly subitems?: MenuSubitemData[];
}

export interface MenuContextValues {
  readonly existsMenu: boolean;
  readonly options: MenuItemData[];
}

interface Props {
  readonly options: MenuItemData[];
}

export const MenuContext = createContext<MenuContextValues>(
  {} as MenuContextValues
);

export const MenuContextProvider: React.FC<Props> = ({ options, children }) => {
  return (
    <MenuContext.Provider
      value={{
        options,
        existsMenu: options?.length > 0
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

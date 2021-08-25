import React from "react";
import { UserModel } from "~/services/@types/user";
import { useAuth } from "~/hooks/use-auth";

export interface AuthContextValues {
  readonly user: UserModel;
  readonly loading: boolean;
  readonly authenticated: boolean;
}

interface Props {}

export const AuthContext = React.createContext<AuthContextValues>(
  {} as AuthContextValues
);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <AuthContext.Provider value={{ user, loading, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { createContext, useContext, useEffect, useMemo } from "react";

const AuthContext = createContext();

const CheckLoginQuery = gql`
  query CheckLogin {
    checkLogin {
      id
      email
      firstName
      lastName
      isAdmin
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const { loading, error, data } = useQuery(CheckLoginQuery);

  const user = data?.checkLogin;
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!loading && !user && currentPath !== "/login") {
      login();
    }

    if (!loading && user && currentPath === "/login") {
      navigateToHome();
    }
  }, [loading, user]);

  const login = async () => {
    window.location = "/login";
  };

  // call this function to sign out logged in user
  const logout = () => {
    // TODO: Clear access Token from local storage..
  };

  const navigateToHome = () => {
    window.location = "/";
  };

  const value = useMemo(
    () => ({
      user: user,
      login,
      logout,
      navigateToHome,
      isAdmin: user?.isAdmin,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {!!loading && <p>Loading...</p>}
      {!!error && <p>Error : {error.message}</p>}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import { createContext, useContext, useState, useEffect } from "react";
import { useLazyGetProfileQuery } from "../services/apiConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [trigger, { isLoading }] = useLazyGetProfileQuery();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && !user) {
      trigger().then((res) => {
        if (res.data) {
          setUser(res.data.data);
        } else {
          logout();
        }
      });
    }
  }, [trigger]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("route");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

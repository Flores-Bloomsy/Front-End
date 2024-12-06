import { useState, useEffect, createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    // Simular la verificación de usuario logueado al montar el componente
    const checkLoggedInUser = async () => {
      // Aquí podrías hacer una llamada a una API o realizar alguna verificación
      // Por ahora, simulamos el usuario como `null`
      const simulatedUser = null; // O reemplaza con lógica real
      setUser(simulatedUser);
    };
    checkLoggedInUser();

    // Limpiar el estado del usuario al desmontar el componente
    return () => {
      setUser(null);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

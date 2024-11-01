import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear un contexto de autenticación
export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const permission = sessionStorage.getItem('permission') || null;
  const [update, setUpdate] = useState(1)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/users/my_details/',
          { method: 'GET', credentials: 'include' }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    getData().then((data) => sessionStorage.setItem('permission', data.rol));
  }, [update]);

  return (
    <AuthContext.Provider value={{ permission, update, setUpdate }}>{children}</AuthContext.Provider>
  );
};

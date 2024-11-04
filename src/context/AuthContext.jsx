import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear un contexto de autenticación
export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [permission, setPermission] = useState(
    sessionStorage.getItem('permission') || null
  );
  const [update, setUpdate] = useState(1);

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


  getData().then((data) => {
    if (data && data.rol !== undefined) {
      sessionStorage.setItem('permission', data.rol);
      setPermission(data.rol);  // Actualizar el estado local de permission
      console.log('Valor de permission actualizado en useEffect:', data.rol);
    } else {
      // Si no hay datos, limpia el permiso
      sessionStorage.removeItem('permission');
      setPermission(null); 
    }
  });
}, [update]);


  console.log('Valor actual de permission desde sessionStorage:', permission);

  return (
    <AuthContext.Provider
      value={{ permission, update, setUpdate, setPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

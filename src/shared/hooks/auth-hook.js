import { useState, useCallback, useEffect } from 'react';



export const useAuth = () => {
  const [uid, setUID] = useState(false);

  const login = useCallback((id) => {
    setUID(id);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        uid: id,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUID(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData 
    ) {
      login(storedData.uid);
    }
  }, [login]);


  return {  login, logout, uid };
};
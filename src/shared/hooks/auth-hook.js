import { useState, useCallback, useEffect } from 'react';



export const useAuth = () => {
  const [email, setEmail] = useState(false);

  const login = useCallback((mail) => {
    setEmail(mail);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        email: mail,
      })
    );
    console.log(localStorage)
  }, []);

  const logout = useCallback(() => {
    setEmail(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData 
    ) {
      login(storedData.email);
    }
  }, [login]);


  return {  login, logout, email };
};
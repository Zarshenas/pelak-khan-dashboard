// import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React , { useState,useEffect , useContext ,createContext  } from 'react';

import {login,logout, checkAuth  } from 'src/api/Auth';
import { storeToken } from '../utils/store-local';

// import { useRouter } from 'src/routes/hooks';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoggedin, setLoggedin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  // Check authentication status on app load
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const accessToken = localStorage.getItem('access'); 
        const response = await checkAuth({token:accessToken});
        if (response.status === 200) {
          setLoggedin(true)
        }
      } catch (error) {
        console.log(error)
        localStorage.removeItem('access')
        setLoggedin(false);
      }finally{
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const loginUn = async (credentials) => {
    try {
      
      const response = await login(credentials)
      if (response.status === 200) {
          toast.success("خوش آمدید")
          const {access , refresh } = response.data;
          // Cookies.set('access', access, { secure: true ,sameSite: 'none' });
          // Cookies.set('refresh', refresh, { secure: true ,sameSite:'none' });
          storeToken("access",access)
          storeToken("refresh" ,refresh)
          setLoggedin(true)
          await sleep(500);
          navigate("/dashboard/users" , {replace:true})

        }else if(response.status === 401){
          toast.error("نام کاربری یا رمزعبور اشتباه است")
        }
    } catch (error) {
      if (error.response.data.detail === "No active account found with the given credentials") {
        toast.error("حساب کاربری فعال با این مشخصات پیدا نشد.")
        
      }
    }}
  
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const logoutUn = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        localStorage.removeItem('access')
        setLoggedin(false)
        await sleep(500);
        navigate("/sign-in" , {replace:true})
      }
    } catch (error) {
        console.log(error)
    }

  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isLoggedin  ,isLoading , logoutUn,loginUn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import Cookies from 'js-cookie';
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
        const accessToken = Cookies.get('access'); 
        const response = await checkAuth({token:accessToken});
        if (response.status === 200) {
          setLoggedin(true)
        }
        // setUser(response.user);
      } catch (error) {
        setLoggedin(false);
      }finally{
        setLoading(false);
      }
    };
    verifyAuth();
  }, [isLoggedin]);

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
          await sleep(500);
          navigate("/" , {replace:true})

        }else if(response.status === 401){
          toast.error("نام کاربری یا رمزعبور اشتباه است")
        }
    } catch (error) {
      toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید")
    }}
  
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const logoutUn = async () => {
    try {
      const response = await logout();
      console.log(response)
      if (response.status === 200) {
        Cookies.remove('access')
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
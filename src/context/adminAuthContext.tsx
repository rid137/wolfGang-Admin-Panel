import { createContext, useEffect, useState, ReactNode } from 'react';
// import { ManagerProfileType } from '../types/managerObj';
import { UserAuthDataType } from '../types/userAuthTypes';

interface AdminAuthContextType {
  adminAuthData: UserAuthDataType | null
  setAdminAuthData: React.Dispatch<React.SetStateAction<UserAuthDataType | null>>

  logout: () => void

  // managerObj: ManagerProfileType | null
  // setManagerObj: React.Dispatch<React.SetStateAction<ManagerProfileType | null>>
}
    
interface AdminAuthContextProviderProps {
  children: ReactNode;
}

export const AdminAuthContext = createContext({} as AdminAuthContextType);

export const AdminAuthContextProvider = ({ children }: AdminAuthContextProviderProps) => {
    const [adminAuthData, setAdminAuthData] = useState<UserAuthDataType | null>(null); 
    // const [managerObj, setManagerObj] = useState<ManagerProfileType | null>(null);
    
    // const LOCAL_STORAGE_MANAGEROBJECT_KEY = "managerObjectData"
    const LOCAL_STORAGE_ADMINAUTHDATA_KEY = "adminAuthData"

  useEffect(() => {
    if (adminAuthData) {
        localStorage.setItem(LOCAL_STORAGE_ADMINAUTHDATA_KEY, JSON.stringify(adminAuthData));
    }
  }, [adminAuthData]);

  // useEffect(() => {
  //   if (managerObj) {
  //       localStorage.setItem(LOCAL_STORAGE_MANAGEROBJECT_KEY, JSON.stringify(managerObj));
  //   }
  // }, [managerObj]);

  useEffect(() => {
    const retrivedAdminAuthData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ADMINAUTHDATA_KEY) as string);

    if(retrivedAdminAuthData) setAdminAuthData(retrivedAdminAuthData);

  }, [])


// useEffect(() => {
//     const retrivedManagerObjectData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MANAGEROBJECT_KEY) as string);

//     if(retrivedManagerObjectData) setAdminAuthData(retrivedManagerObjectData);

// }, [])


    const logout = () => {
      localStorage.removeItem(LOCAL_STORAGE_ADMINAUTHDATA_KEY);
      setAdminAuthData(null);
    };

    // if (adminAuthData === null) {
    //   return <Navigate to='/' />;
    // }




  // console.log("returnedUserData", returnedUserData)
  // console.log("AdminAuthData", adminAuthData)
  // console.log("managerObj", managerObj)
    
  
    return (
      <AdminAuthContext.Provider value={{ adminAuthData, setAdminAuthData,  logout  }}>
        {children}
      </AdminAuthContext.Provider>
    )
};  
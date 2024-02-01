import { createContext, useEffect, useState, ReactNode } from 'react';
// import { ManagerProfileType } from '../types/managerObj';
import { UserAuthDataType } from '../types/userAuthTypes';

interface ManagerAuthContextType {
  managerAuthData: UserAuthDataType | null
  setManagerAuthData: React.Dispatch<React.SetStateAction<UserAuthDataType | null>>
}
    
interface ManagerAuthContextProviderProps {
  children: ReactNode;
}

export const ManagerAuthContext = createContext({} as ManagerAuthContextType);

export const AuthContextProvider = ({ children }: ManagerAuthContextProviderProps) => {
    const [managerAuthData, setManagerAuthData] = useState<UserAuthDataType | null>(null); 
    
    // const LOCAL_STORAGE_KEY = "returnedUserData"
    const LOCAL_STORAGE_MANAGERAUTHDATA_KEY = "userAuthData"

  useEffect(() => {
    if (managerAuthData) {
        localStorage.setItem(LOCAL_STORAGE_MANAGERAUTHDATA_KEY, JSON.stringify(managerAuthData));
    }
  }, [managerAuthData]);

  useEffect(() => {
    const retrivedManagerAuthData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MANAGERAUTHDATA_KEY) as string)
    // console.log(retrivedUserData)

    if(retrivedManagerAuthData) setManagerAuthData(retrivedManagerAuthData)

    // if (retrivedUserData) {
    //     reset({
    //         email: retrivedUserData.email,
    //         password: retrivedUserData.password,
    //     });
    // }

}, [])


  // console.log("returnedUserData", returnedUserData)
  // console.log("userAuthData", userAuthData)
  // console.log("user", user)
    
  
    return (
      <ManagerAuthContext.Provider value={{ managerAuthData, setManagerAuthData }}>
        {children}
      </ManagerAuthContext.Provider>
    )
};  
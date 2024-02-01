import { createContext, useEffect, useState, ReactNode } from 'react';
import { UserAuthDataType } from '../types/userAuthTypes';


type UserType = {
  email?: string 
  firstName?: string
  lastName?: string
  phoneNumber?: string
  password?: string
}

// interface UserAuthData {
//   token: string
//   refreshToken: string
//   userId: number
//   email: string
// }

interface AuthContextType {
  user: UserType | null
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>
  returnedUserData: any
  setReturnedUserData: React.Dispatch<React.SetStateAction<any>>

  userAuthData: UserAuthDataType | null
  setUserAuthData: React.Dispatch<React.SetStateAction<UserAuthDataType | null>>

}
    
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null); 
    const [returnedUserData, setReturnedUserData] = useState<any>();
    const [userAuthData, setUserAuthData] = useState<UserAuthDataType | null>(null)

    const LOCAL_STORAGE_KEY = "returnedUserData"
    const LOCAL_STORAGE_USERAUTHDATA_KEY = "userAuthData"


  useEffect(() => {
    if (returnedUserData) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(returnedUserData));
    }
  }, [returnedUserData]);

  useEffect(() => {
    if (userAuthData) {
        localStorage.setItem(LOCAL_STORAGE_USERAUTHDATA_KEY, JSON.stringify(userAuthData));
    }
  }, [userAuthData]);

  useEffect(() => {
    const retrivedUserAuthData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERAUTHDATA_KEY) as string)
    // console.log(retrivedUserData)

    if(retrivedUserAuthData) setUserAuthData(retrivedUserAuthData)

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
      <AuthContext.Provider value={{ user, setUser, returnedUserData, setReturnedUserData, userAuthData, setUserAuthData }}>
        {children}
      </AuthContext.Provider>
    )
};  
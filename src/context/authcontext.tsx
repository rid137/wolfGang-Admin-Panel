import { createContext, useEffect, useState, ReactNode } from 'react';


type UserType = {
  email?: string 
  firstName?: string
  lastName?: string
  phoneNumber?: string
  password?: string
}

interface UserAuthData {
  token: string
  refreshToken: string
  userId: number
  email: string
}

interface AuthContextType {
  user: UserType | null
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>
  returnedUserData: any
  setReturnedUserData: React.Dispatch<React.SetStateAction<any>>

  userAuthData: UserAuthData | null
  setUserAuthData: React.Dispatch<React.SetStateAction<UserAuthData | null>>

}
    
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null); 
    const [returnedUserData, setReturnedUserData] = useState<any>(); // Work on the 'any' type later
    const [userAuthData, setUserAuthData] = useState<UserAuthData | null>(null)

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
  console.log("userAuthData", userAuthData)
  // console.log("user", user)
    
  
    return (
      <AuthContext.Provider value={{ user, setUser, returnedUserData, setReturnedUserData, userAuthData, setUserAuthData }}>
        {children}
      </AuthContext.Provider>
    )
};










// type UserContextType = {
//     user: UserType | null
//     setUser: React.Dispatch<React.SetStateAction<UserType | null>>
// }

// type SignUpContextProviderProps = {
//     children: React.ReactNode
// }

// export const SignUpContext = createContext({} as UserContextType)

// export const SignUpContextProvider = ({ children }: SignUpContextProviderProps) => {
//     const [user, setUser] = useState<UserType | null>(null)

//     return (
//         <SignUpContext.Provider value={{ user, setUser }}>
//             {children}
//         </SignUpContext.Provider>
//     )
// }


  
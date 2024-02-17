import React, { useEffect } from 'react';
import { AdminAuth } from '../../hooks/useAdminAuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedPageProps {
  children: ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const { adminAuthData } = AdminAuth();

  // if (userAuthData === null) {
  //   // setIsLoading(false)
  //   return <Navigate to='/login' />;
  // }

  useEffect(() => {
    
  })


  if (adminAuthData === null) {
    return <Navigate to='/' />;
  }

  return <>{children}</>;
};

export default ProtectedPage;


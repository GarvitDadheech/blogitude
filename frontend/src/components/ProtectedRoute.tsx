import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Loader } from './Loader';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await axios.get('/api/validate-token', {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.status === 200) {
          setIsValid(response.data.valid);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div><Loader/></div>;
        </div>
        )
    }

  if (!isValid) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;

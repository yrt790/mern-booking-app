import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

// Create Context
const AppContext = React.createContext<AppContext | undefined>(undefined);

// Create Provider
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery('validateToken', apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// method to access context
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};

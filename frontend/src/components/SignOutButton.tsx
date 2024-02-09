import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignoutButton = () => {
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({ message: 'Sign Out Successful', type: 'SUCCESS' });
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'ERROR' });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};
export default SignoutButton;

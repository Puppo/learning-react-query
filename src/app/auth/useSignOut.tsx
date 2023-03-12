import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '../constants/queryKeys';

type IUseSignOut = () => void

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSignOut = useCallback(() => {
    queryClient.setQueryData([QUERY_KEY.user], null);
    navigate('/auth/sign-in');
  }, [navigate, queryClient])

  return onSignOut

}
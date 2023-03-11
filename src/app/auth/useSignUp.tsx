import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from '../constants/queryKeys';
import { ResponseError } from '../utils/Errors/ResponseError';
import { User } from './useUser';

async function signUp(email: string, password: string): Promise<User> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  if (!response.ok)
    throw new ResponseError('Failed on sign up request', response);

  return await response.json();
}

type IUseSignUp = UseMutateFunction<User, unknown, {
  email: string;
  password: string;
}, unknown>


export function useSignUp(): IUseSignUp {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signUpMutation } = useMutation<User, unknown, { email: string, password: string }, unknown>(
    ({
      email,
      password
    }) => signUp(email, password), {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data);
      navigate('/');
    },
    onError: (error) => {
      enqueueSnackbar('Ops.. Error on sign up. Try again!', {
        variant: 'error'
      });
    }
  });

  return signUpMutation
}
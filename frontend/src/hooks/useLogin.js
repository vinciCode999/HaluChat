import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const queryClient = useQueryClient();

   const { mutate:loginMutation, isPending, error } = useMutation({
      mutationFn:login,
      onSuccess: () => {
        toast.success("Logged in successfully");
        queryClient.invalidateQueries({queryKey: ["authUser"]});
      }
    })

    return {
      loginMutation,
      isPending,
      error
    }
}

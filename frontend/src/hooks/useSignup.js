import React from 'react'
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { signup } from '../lib/api';

export const useSignup = () => {
  const queryClient = useQueryClient();
    const {mutate:signupMutation, isPending, error} = useMutation({
      mutationFn: signup,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"]});
      }
    });
  

  return{
    signupMutation,
    isPending,
    error
  }
}

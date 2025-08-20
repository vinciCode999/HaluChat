import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate:logoutMutation, isPending, error  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
  })

  return {
    logoutMutation,
    isPending,
    error
  }
}

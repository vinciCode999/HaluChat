import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { completeOnBoarding } from '../lib/api';
import toast from 'react-hot-toast';

export const useOnboarding = () => {
  const queryClient = useQueryClient();
  const { mutate:onBoardingMutation, isPending, error } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Onboarding completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);

    }
  })
  return{
    onBoardingMutation,
    isPending,
    error
  }
}

import React from 'react'
import { 
  Homepage, 
  CallPage, 
  NotificationsPage, 
  ChatPage, 
  OnboardingPage, 
  SignupPage, 
  Loginpage 
} from './pages'
import { Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { axiosInstance } from './lib/axios';
export default function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: async() => {
      const response = await axiosInstance.get('/auth/me');
      return response.data;
    },
    retry: false,
  });


  console.log(data);

  return (
    <div data-theme="night" className='h-screen'>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Loginpage />} />
      </Routes>
      <Toaster />
    </div>
  )
}
